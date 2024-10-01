
const Usuario = require('../models/usuario');
const jsw = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração de armazenamento para o Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'avatars');
        // Garantir que o diretório exista
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Gerar um nome de arquivo único
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Inicializar o multer com a configuração de armazenamento
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2 MB
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Apenas arquivos de imagem são permitidos!'));
    }
});

// Middleware para lidar com o upload único de avatar
const uploadAvatar = upload.single('avatar');

module.exports = {
    novo: [
        uploadAvatar,
        async (req, res) => {
            try {
                const { nome, cpf, senha } = req.body;
                const novoUsuario = new Usuario({
                    nome,
                    cpf,
                    senha,
                    avatar: req.file ? `/uploads/avatars/${req.file.filename}` : ''
                });

                await novoUsuario.save();
                res.status(201).json(novoUsuario);
            } catch (err) {
                if (err instanceof multer.MulterError) {
                    // Erro do Multer durante o upload
                    console.error('Erro do Multer:', err);
                    return res.status(400).send(err.message);
                } else if (err.message === 'Apenas arquivos de imagem são permitidos!') {
                    return res.status(400).send(err.message);
                }
                console.error('Erro ao cadastrar usuário:', err);
                res.status(500).send('Erro ao cadastrar usuário.');
            }
        }
    ],

    listar: async (req, res) => {
        try {
            const usuarios = await Usuario.find({});
            res.send(usuarios);
        } catch (err) {
            console.error('Erro ao listar usuários:', err);
            res.status(500).send('Erro ao listar usuários.');
        }
    },

    buscarById: async (req, res) => {
        try {
            const usuario = await Usuario.findById(req.params.idUsuario);
            if (usuario) {
                res.send(usuario);
            } else {
                res.status(404).send('Usuário não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).send('Erro ao buscar usuário.');
        }
    },

    editar: [
        uploadAvatar,
        async (req, res) => {
            try {
                console.log('Parâmetros recebidos:', req.params);

                const idUsuario = req.params.id;
                console.log(`Tentando encontrar o usuário com ID: ${idUsuario}`);

                const usuario = await Usuario.findById(idUsuario);

                if (!usuario) {
                    console.log('Usuário não encontrado.');
                    return res.status(404).send('Usuário não encontrado.');
                }

                console.log('Usuário encontrado:', usuario);

                if (req.body.senha) {
                    console.log('Nova senha recebida:', req.body.senha);
                    console.log('Atualizando senha do usuário...');
                    usuario.senha = req.body.senha;
                }

                if (req.file) {
                    console.log('Novo avatar recebido:', req.file.filename);
                    // Deletar o avatar antigo se existir
                    if (usuario.avatar) {
                        const oldAvatarPath = path.join(__dirname, '..', usuario.avatar);
                        fs.unlink(oldAvatarPath, (err) => {
                            if (err) console.error('Erro ao deletar o avatar antigo:', err);
                        });
                    }
                    usuario.avatar = `/uploads/avatars/${req.file.filename}`;
                }

                console.log('Salvando as alterações no usuário...');
                await usuario.save();

                console.log('Usuário atualizado com sucesso:', usuario);
                res.json(usuario);
            } catch (err) {
                if (err instanceof multer.MulterError) {
                    // Erro do Multer durante o upload
                    console.error('Erro do Multer:', err);
                    return res.status(400).send(err.message);
                } else if (err.message === 'Apenas arquivos de imagem são permitidos!') {
                    return res.status(400).send(err.message);
                }
                console.error('Erro ao atualizar usuário:', err);
                res.status(500).send('Erro ao atualizar usuário.');
            }
        }
    ],

    deletar: async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const resultado = await Usuario.findByIdAndDelete(idUsuario);

            if (resultado) {
                // Deletar o arquivo de avatar se existir
                if (resultado.avatar) {
                    const avatarPath = path.join(__dirname, '..', resultado.avatar);
                    fs.unlink(avatarPath, (err) => {
                        if (err) console.error('Erro ao deletar o avatar:', err);
                    });
                }
                res.send('Usuário deletado com sucesso!');
            } else {
                res.status(404).send('Usuário não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).send('Erro ao deletar usuário.');
        }
    },

    autenticar: async (req, res) => {
        const { cpf, senha } = req.body;
        try {
            const usuario = await Usuario.findOne({ cpf });

            if (!usuario) {
                return res.status(401).json({ message: 'CPF ou Senha incorretos.' });
            }

            const isMatch = await usuario.comparePassword(senha);

            if (!isMatch) {
                return res.status(401).json({ message: 'CPF ou Senha incorretos.' });
            }
            const token = jsw.sign({ id: usuario._id }, 'SECRET', { expiresIn: '1d' }) // Incluindo o ID do usuário no token
            return res.status(200).json({ token });
        } catch (err) {
            console.error('Erro ao autenticar usuário:', err);
            res.status(500).json({ message: 'Erro ao autenticar usuário', error: err });
        }
    }
};

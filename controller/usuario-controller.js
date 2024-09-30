const Usuario = require('../models/usuario'); 
const jsw = require('jsonwebtoken');

module.exports = {
    novo: async (req, res) => {
        try {
            const novoUsuario = new Usuario({
                nome: req.body.nome,
                cpf: req.body.cpf,
                senha: req.body.senha
            });

            await novoUsuario.save();
            res.send('Novo usuário cadastrado com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).send('Erro ao cadastrar usuário.');
        }
    },

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

    editar: async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const dadosAtualizados = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                senha: req.body.senha
            };

            const usuarioAtualizado = await Usuario.findByIdAndUpdate(idUsuario, dadosAtualizados, { new: true });

            if (usuarioAtualizado) {
                res.send('Usuário atualizado com sucesso!');
            } else {
                res.status(404).send('Usuário não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send('Erro ao atualizar usuário.');
        }
    },

    deletar: async (req, res) => {
        try {
            const idUsuario = req.params.idUsuario;
            const resultado = await Usuario.findByIdAndDelete(idUsuario);

            if (resultado) {
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
            const token = jsw.sign({},'SECRET', {expiresIn:'1d'})
            return res.status(200).json({token});
        } catch (err) {
            console.error('Erro ao autenticar usuário:', err);
            res.status(500).json({ message: 'Erro ao autenticar usuário', error: err });
        }
    }
};





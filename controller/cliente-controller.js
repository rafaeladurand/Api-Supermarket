const Cliente = require('../models/cliente');
const jsw = require('jsonwebtoken');


module.exports = {
    novo: async (req, res) => {
        try {
            const novoCliente = new Cliente({
                nome: req.body.nome,
                cpf: req.body.cpf,
                idade: req.body.idade,
                tempoCliente: req.body.tempoCliente,
                senha: req.body.senha,
                desconto: 0.0
            });

            const resultado = await novoCliente.save();
            console.log('Cliente cadastrado!');
            res.status(201).json({ message: 'Novo cliente cadastrado com sucesso!' });
        } catch (err) {
            console.error('Erro ao cadastrar cliente:', err);
            res.status(500).json({ message: 'Erro ao cadastrar cliente.' });
        }
    },

    listar: async (req, res) => {
        try {
            const clientes = await Cliente.find({});
            res.status(200).json(clientes);
        } catch (err) {
            console.error('Erro ao listar clientes:', err);
            res.status(500).json({ message: 'Ocorreu um erro ao listar clientes.' });
        }
    },

    buscarById: async (req, res) => {
        try {
            const cliente = await Cliente.findById(req.params.idCliente);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado.' });
            }
        } catch (err) {
            console.error('Erro ao buscar cliente por ID:', err);
            res.status(500).json({ message: 'Erro ao buscar cliente por ID.' });
        }
    },

    editar: async (req, res) => {
        try {
            const idCliente = req.params.idCliente;
            const dadosAtualizados = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                idade: req.body.idade,
                tempoCliente: req.body.tempoCliente,
                desconto: req.body.desconto
            };

            const clienteAtualizado = await Cliente.findByIdAndUpdate(idCliente, dadosAtualizados, { new: true });

            if (clienteAtualizado) {
                res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado.' });
            }
        } catch (err) {
            console.error('Erro ao atualizar cliente:', err);
            res.status(500).json({ message: 'Erro ao atualizar cliente.' });
        }
    },

    deletar: async (req, res) => {
        try {
            const resultado = await Cliente.findByIdAndDelete(req.params.idCliente);
            if (resultado) {
                res.status(200).json({ message: 'Cliente deletado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Cliente não encontrado.' });
            }
        } catch (err) {
            console.error('Erro ao deletar cliente:', err);
            res.status(500).json({ message: 'Erro ao deletar cliente.' });
        }
    },

    autenticar: async (req, res) => {
        const { cpf, senha } = req.body;

        try {
            const cliente = await Cliente.findOne({ cpf });

            if (!cliente) {
                return res.status(401).json({ message: 'CPF ou Senha incorretos.' });
            }

            const isMatch = await cliente.comparePassword(senha);

            if (isMatch) {
                const token = jsw.sign({},'SECRET', {expiresIn:'1d'})// Criação de Token 
                res.status(200).json({token});
            } else {
                res.status(401).json({ message: 'CPF ou Senha incorretos. ' });
            }
        } catch (err) {
            console.error('Erro ao autenticar cliente:', err);
            res.status(500).json({ message: 'Erro ao autenticar cliente.' });
        }
    }
};

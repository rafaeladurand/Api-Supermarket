
const Compra = require('../models/compra');
const Produto = require('../models/produto');
const Cliente = require('../models/cliente');

module.exports = {
    novo: async (req, res) => {
        try {
            const { cliente, itens } = req.body;

            const clienteExistente = await Cliente.findById(cliente);
            if (!clienteExistente) return res.status(404).send('Cliente não encontrado.');

            let precoTotal = 0;
            for (const item of itens) {
                const produto = await Produto.findById(item.produto);
                if (!produto) return res.status(404).send(`Produto com ID ${item.produto} não encontrado.`);

                if (item.precoUnitario !== produto.precoAtual) {
                    return res.status(400).send(`Preço unitário do produto ${item.produto} está incorreto.`);
                }

                item.precoTotal = item.precoUnitario * item.quantidade;
                precoTotal += item.precoTotal;
            }

            const novaCompra = new Compra({
                cliente,
                itens,
                precoTotal
            });

            const resultado = await novaCompra.save();
            res.status(201).send(resultado);
        } catch (err) {
            console.error('Erro ao criar a compra:', err);
            res.status(500).send('Erro ao criar a compra.');
        }
    },

    listar: async (req, res) => {
        try {
            const compras = await Compra.find().populate('cliente').populate('itens.produto');
            res.send(compras);
        } catch (err) {
            console.error('Erro ao listar compras:', err);
            res.status(500).send('Erro ao listar compras.');
        }
    },

    buscarById: async (req, res) => {
        try {
            const compra = await Compra.findById(req.params.idCompra).populate('cliente').populate('itens.produto');
            if (compra) {
                res.send(compra);
            } else {
                res.status(404).send('Compra não encontrada.');
            }
        } catch (err) {
            console.error('Erro ao buscar a compra:', err);
            res.status(500).send('Erro ao buscar a compra.');
        }
    },

 
    editar: async (req, res) => {
        try {
            const { cliente, itens } = req.body;
            let precoTotal = 0;

            const clienteExistente = await Cliente.findById(cliente);
            if (!clienteExistente) return res.status(404).send('Cliente não encontrado.');

            for (const item of itens) {
                const produto = await Produto.findById(item.produto);
                if (!produto) return res.status(404).send(`Produto com ID ${item.produto} não encontrado.`);

                if (item.precoUnitario !== produto.precoAtual) {
                    return res.status(400).send(`Preço unitário do produto ${item.produto} está incorreto.`);
                }

                item.precoTotal = item.precoUnitario * item.quantidade;
                precoTotal += item.precoTotal;
            }

            const compraAtualizada = await Compra.findByIdAndUpdate(
                req.params.idCompra,
                { cliente, itens, precoTotal },
                { new: true }
            ).populate('cliente').populate('itens.produto');

            if (compraAtualizada) {
                res.send(compraAtualizada);
            } else {
                res.status(404).send('Compra não encontrada.');
            }
        } catch (err) {
            console.error('Erro ao atualizar a compra:', err);
            res.status(500).send('Erro ao atualizar a compra.');
        }
    },

    deletar: async (req, res) => {
        try {
            const resultado = await Compra.findByIdAndDelete(req.params.idCompra);
            if (resultado) {
                res.send('Compra removida com sucesso!');
            } else {
                res.status(404).send('Compra não encontrada.');
            }
        } catch (err) {
            console.error('Erro ao remover a compra:', err);
            res.status(500).send('Erro ao remover a compra.');
        }
    }
};

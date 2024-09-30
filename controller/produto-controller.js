const Produto = require('../models/produto'); 

module.exports = {
    novo: async (req, res) => {
        try {
            const novoProduto = new Produto({
                nome: req.body.nome,
                precoAtual: req.body.precoAtual,
                precoPromocao: req.body.precoPromocao,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                dataValidade: req.body.dataValidade,
                image: req.body.image,
            });

            await novoProduto.save();
            res.send('Novo produto cadastrado com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar produto:', err);
            res.status(500).send('Erro ao cadastrar produto.');
        }
    },

    listar: async (req, res) => {
        try {
            const produtos = await Produto.find({});
            res.send(produtos);
        } catch (err) {
            console.error('Erro ao listar produtos:', err);
            res.status(500).send('Erro ao listar produtos.');
        }
    },

    buscarById: async (req, res) => {
        try {
            const produto = await Produto.findById(req.params.idProduto);
            if (produto) {
                res.send(produto);
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).send('Erro ao buscar produto.');
        }
    },

    editar: async (req, res) => {
        try {
            const idProduto = req.params.idproduto;
            const dadosAtualizados = {
                nome: req.body.nome,
                precoAtual: req.body.precoAtual,
                precoPromocao: req.body.precoPromocao,
                tipo: req.body.tipo,
                descricao: req.body.descricao,
                dataValidade: req.body.dataValidade,
                image: req.body.image,
            };

            const produtoAtualizado = await Produto.findByIdAndUpdate(idProduto, dadosAtualizados, { new: true });

            if (produtoAtualizado) {
                res.send('Produto atualizado com sucesso!');
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).send('Erro ao atualizar produto.');
        }
    },


    deletar: async (req, res) => {
        try {
            const idProduto = req.params.idproduto;
            const resultado = await Produto.findByIdAndDelete(idProduto);

            if (resultado) {
                res.send('Produto deletado com sucesso!');
            } else {
                res.status(404).send('Produto não encontrado.');
            }
        } catch (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).send('Erro ao deletar produto.');
        }
    },

     listarByNome: async (req, res) => {
        try {
            const nome = req.query.nome;
            if (!nome) {
                return res.status(400).send('O nome do produto é obrigatório.');
            }

            const produtos = await Produto.find({ 
                nome: { $regex: nome, $options: 'i' } // Busca case-insensitive
            });

            if (produtos.length > 0) {
                res.status(200).send(produtos);
            } else {
                res.status(404).send('Nenhum produto encontrado.');
            }
        } catch (err) {
            console.error('Erro ao buscar produtos pelo nome:', err);
            res.status(500).send('Erro ao buscar produtos pelo nome.');
        }
    },

};

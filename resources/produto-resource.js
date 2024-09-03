const express = require('express');
const produtoController = require('../controller/produto-controller')

const router = express.Router();

//rotas
//app.get('/categorias/:idcategoria/listar-produtos', (req, res) => {


router.post('/', produtoController.novo);
router.get('/', produtoController.listar);
router.get('/:idProduto', produtoController.buscarById);
router.put('/:idproduto', produtoController.editar);
router.delete('/:idproduto', produtoController.deletar);

module.exports = router;
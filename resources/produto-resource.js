const express = require('express');
const produtoController = require('../controller/produto-controller')
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

//rotas
//app.get('/categorias/:idcategoria/listar-produtos', (req, res) => {

router.use(isAuthenticated);
router.post('/', produtoController.novo);
router.get('/', produtoController.listar);
router.get('/:idProduto', produtoController.buscarById);
router.put('/:idproduto', produtoController.editar);
router.delete('/:idproduto', produtoController.deletar);
router.get('/produto/nome', produtoController.listarByNome)

module.exports = router;
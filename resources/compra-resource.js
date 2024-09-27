// routes/compra-routes.js
const express = require('express');
const compraController = require('../controller/compra-controller');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.use(isAuthenticated);
router.post('/', compraController.novo);
router.get('/', compraController.listar);
router.get('/:idCompra', compraController.buscarById);
router.put('/:idCompra', compraController.editar);
router.delete('/:idCompra', compraController.deletar);

module.exports = router;

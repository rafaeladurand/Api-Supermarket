// routes/compra-routes.js
const express = require('express');
const compraController = require('../controller/compra-controller');

const router = express.Router();

router.post('/', compraController.novo);
router.get('/', compraController.listar);
router.get('/:idCompra', compraController.buscarById);
router.put('/:idCompra', compraController.editar);
router.delete('/:idCompra', compraController.deletar);

module.exports = router;

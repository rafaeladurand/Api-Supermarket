const express = require('express');
const clienteController = require('../controller/cliente-controller');

const router = express.Router();


router.post('/', clienteController.novo);
router.get('/', clienteController.listar);
router.get('/:idCliente', clienteController.buscarById);
router.put('/:idCliente', clienteController.editar);
router.delete('/:idCliente', clienteController.deletar);
router.post('/autenticar', clienteController.autenticar);

module.exports = router;

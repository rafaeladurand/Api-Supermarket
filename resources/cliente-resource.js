const express = require('express');
const clienteController = require('../controller/cliente-controller');
const isAuthenticated = require('../middleware/isAuthenticated');


const router = express.Router();

router.use(isAuthenticated);
router.post('/', clienteController.novo);
router.get('/', clienteController.listar);
router.get('/:idCliente', clienteController.buscarById);
router.put('/:idCliente', clienteController.editar);
router.delete('/:idCliente', clienteController.deletar);


module.exports = router;

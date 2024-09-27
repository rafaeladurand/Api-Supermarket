const express = require('express');
const clienteController = require('../controller/cliente-controller');
const usuarioController = require('../controller/usuario-controller');
const router = express.Router();

router.post('/cliente', clienteController.autenticar);
router.post('/usuario', usuarioController.autenticar);

module.exports = router;
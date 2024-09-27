const express = require('express');
const usuarioController = require('../controller/usuario-controller');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.use(isAuthenticated);
router.post('/', usuarioController.novo);
router.get('/', usuarioController.listar);
router.get('/:idUsuario', usuarioController.buscarById);
router.put('/:idUsuario', usuarioController.editar);
router.delete('/:idUsuario', usuarioController.deletar);
router.post('/autenticar', usuarioController.autenticar);

module.exports = router;

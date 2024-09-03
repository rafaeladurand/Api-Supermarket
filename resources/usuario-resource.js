const express = require('express');
const usuarioController = require('../controller/usuario-controller');

const router = express.Router();

router.post('/', usuarioController.novo);
router.get('/', usuarioController.listar);
router.get('/:idUsuario', usuarioController.buscarById);
router.put('/:idUsuario', usuarioController.editar);
router.delete('/:idUsuario', usuarioController.deletar);
router.post('/autenticar', usuarioController.autenticar);

module.exports = router;

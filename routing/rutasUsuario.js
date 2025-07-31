const express = require('express')
const router = express.Router()
const usuarioControlador = require('../controladores/usuarioControlador')

router.get('',usuarioControlador.obtenerUsuarios)
router.get('/:id',usuarioControlador.obtenerUsuarioPorId)
router.post('/',usuarioControlador.crearUsuario)
router.put('/:id',usuarioControlador.actualizarUsuario)
router.delete('/:id',usuarioControlador.eliminarUsuario)
router.post('/login',usuarioControlador.login)

module.exports = router;
const express = require('express')
const router = express.Router()
const camisetaControlador = require('../controladores/CamisetaControlador')

router.get('',camisetaControlador.obtenerCamiseta)
router.get('/:id',camisetaControlador.obtenerCamisetaPorId)
router.post('/',camisetaControlador.crearCamiseta)
router.put('/:id',camisetaControlador.actualizarCamiseta)
router.delete('/:id',camisetaControlador.eliminarCamiseta)

module.exports = router;
const express = require('express')
const router = express.Router()
const camisetaControlador = require('../controladores/CamisetaControlador')
const {verificarToken} = require('../seguridad/auth')

router.get('/',camisetaControlador.obtenerCamiseta)
router.get('/:id',verificarToken,camisetaControlador.obtenerCamisetaPorId)
router.post('/',verificarToken,camisetaControlador.crearCamiseta)
router.put('/:id',verificarToken,camisetaControlador.actualizarCamiseta)
router.put('/vota/:id',camisetaControlador.updateCamisetaVoto)
router.delete('/:id',verificarToken,camisetaControlador.eliminarCamiseta)

module.exports = router;
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware para verificar JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];  
  
  const token = req.query.token || req.headers['authorization'].split(' ')[1];  // Espera formato "Bearer token"
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    // Verifica y decodifica el token
    req.usuarioId = decoded.id;                    // Guardamos el id del token en la request para usarlo después
    next();                                       // Token válido, continuar a la siguiente función
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}
module.exports = {verificarToken};
const { Schema, model } = require('mongoose');

// Definir el esquema de Usuario
const usuarioSchema = new Schema({
  nombre:      { type: String, required: true },               // Nombre del usuario, campo obligatorio (required)
  email:       { type: String, required: true, unique: true }, // Email único y obligatorio
  clave:       { type: String, required: true },               // Contraseña (almacenaremos un hash, no el texto plano)
  fechaRegistro: { type: Date, default: Date.now }             // Fecha de registro con valor por defecto la fecha actual
});

// Crear el modelo Usuario basado en el esquema
//const Usuario = model('Usuario', usuarioSchema);
module.exports = model('Usuario',usuarioSchema)

const express = require('express');
const app = express();
// Middleware para parsear JSON en las peticiones (body-parser integrado)
app.use(express.json());

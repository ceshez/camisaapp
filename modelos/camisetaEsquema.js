const { Schema, model } = require('mongoose');
const CamisetaSchema = new Schema({
  creador: {type: Schema.Types.ObjectId, ref: 'Usuario'},
  torsoColor: String,
  mangaIzqColor: String,
  mangaDerColor: String,
  cuelloIzqColor: String,
  cuelloDerColor: String,
  fechaCreacion: { type: Date, default: Date.now },
  votos: [],       // (ver siguiente sección)
  calificacion: { type: Number, default: 0 }
});
module.exports = model('Camiseta', CamisetaSchema);
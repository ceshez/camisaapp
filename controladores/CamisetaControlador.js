const Camiseta = require('../modelos/camisetaEsquema');

// Obtener todos los usuarios
exports.obtenerCamiseta = async (req, res) => {
  try {
    const camisetas = await Camiseta.find();    // Busca todos los documentos de usuarios en la BD
    res.json(camisetas);                       // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
  }
};

// Obtener un usuario por ID
exports.obtenerCamisetaPorId = async (req, res) => {
  try {
    const camiseta = await Camiseta.findById(req.params.id); // Busca usuario por el ID proporcionado
    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrado' }); // Si no existe, 404
    }
    res.json(camiseta); // Si existe, lo devolvemos en JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Crear un nuevo usuario
exports.crearCamiseta = async (req, res) => {
  try {
    const datosActualizados = req.body;

    const nuevaCamiseta = new Camiseta(datosActualizados);
    const camisetaGuardada = await nuevaCamiseta.save();      // Guardamos en la base de datos
    res.status(201).json(camisetaGuardada);    // Devolvemos el usuario creado con código 201 (Creado)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear camiseta' }); // Posibles errores de validación
  }
};

// Actualizar un usuario existente
exports.actualizarCamiseta = async (req, res) => {
  try {
    const datosActualizados = req.body;
    const camisetaActualizada = await Camiseta.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true } // opción new:true para obtener el documento actualizado
    );
    if (!camisetaActualizada) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(camisetaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar camiseta' });
  }
};

// Eliminar un usuario
exports.eliminarCamiseta = async (req, res) => {
  try {
    const camisetaEliminada = await Camiseta.findByIdAndDelete(req.params.id);
    if (!camisetaEliminada) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }
    res.json({ message: 'camiseta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};


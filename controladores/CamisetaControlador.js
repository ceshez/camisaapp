const Camiseta = require('../modelos/camisetaEsquema');
const Usuario = require('../modelos/usuarioEsquema')

// Obtener todos los usuarios
exports.obtenerCamiseta = async (req, res) => {
  try {
    const camisetas = await Camiseta.find();  // Lista de camisetas desde la coleccion (ejemplo)
    // Enriquecer cada camiseta con datos del usuario creador:
      const camisetasConUsuario = await Promise.all(
        camisetas.map(async (c) => {
    try {
      // Buscar al usuario por ID (c.creador) y seleccionar solo nombre y correo
      const usuario = await Usuario.findById(c.creador).select('nombre correo');
      return {
        ...c.toObject(),        // Convertir el documento de Mongoose a objeto plano JS
        creador: usuario || null // Reemplazar el campo 'creador' con los datos del usuario (o null si no se encontró)
      };
    } catch (error) {
      // En caso de error al buscar usuario, devolvemos la camiseta con 'creador' null
      return {
        ...c.toObject(),
        creador: null
      };
    }
  })
);
    res.json(camisetasConUsuario);                       // Responde con la lista en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
  }
};

exports.updateCamisetaVoto = async (id, valor) => {
  try {
    const resp = await fetch(`/api/camisetas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <TU_TOKEN_AQUI>'
      },
      body: JSON.stringify({ calificacion: valor })
    });
    if (!resp.ok) {
      throw new Error('Error al enviar voto');
    }
    // Se asume que el servidor devuelve la camiseta actualizada o un status 200
    console.log(`Voto enviado para camiseta ${id}: ${valor}`);
    // Volver a cargar las camisetas para actualizar la UI con la nueva calificación
    await loadCamisetas();
  } catch (error) {
    console.error('Error votando camiseta:', error);
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

    nuevaCamiseta.creador = req.usuarioId; 
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
// Asignar el ID del creador desde el token  
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
    console.error(error)
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


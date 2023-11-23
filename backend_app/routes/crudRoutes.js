const express = require('express');
const router = express.Router();



module.exports = (db) => {

// Rutas CRUD para la tabla "Abogados"
router.post('/insertarabogado', (req, res) => {
  // Recibe los datos del nuevo abogado desde el cuerpo de la solicitud (req.body)
  const {
    nombre,
    apellido,
    area_especializacion,
    fechaNacimiento,
    genero,
    direccion,
    telefono,
    correo,
    num_carnet,
    imagen
  } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!nombre || !apellido || !fechaNacimiento || !genero || !direccion || !telefono || !correo || !area_especializacion || !num_carnet) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Abogados"
  const abogadoSql = `
      INSERT INTO Abogados (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, correo_electronico,num_carnet ,area_especializacion, imagen)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
  `;
  const abogadoValues = [nombre, apellido, fechaNacimiento, genero, direccion, telefono, correo, num_carnet,area_especializacion, imagen];

  // Ejecuta la consulta para insertar en la tabla "Abogados"
  db.query(abogadoSql, abogadoValues, (err, abogadoResult) => {
      if (err) {
          console.error('Error al insertar abogado:', err);
          res.status(500).json({ error: 'Error al insertar abogado' });
      } else {
          // Devuelve un mensaje de éxito como respuesta
          res.status(200).json({ message: 'Abogado insertado exitosamente' });
      }
  });
});


router.get('/readAbogado', (req, res) => {
  const sql = 'SELECT * FROM Abogados';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Abogados:', err);
      res.status(500).json({ error: 'Error al leer registros de Abogados' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para actualizar un abogado por ID
router.put('/updateabogado/:id_abogado', (req, res) => {
  const id_abogado = req.params.id_abogado;
  const {
    nombre,
    apellido,
    area_especializacion,
    fechaNacimiento,
    genero,
    direccion,
    telefono,
    correo,
    num_carnet,
    imagen
  } = req.body;

  if (!nombre || !apellido || !fechaNacimiento || !genero || !direccion || !telefono || !correo || !area_especializacion || !num_carnet) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
  UPDATE Abogados
  SET nombre = ?, apellido = ?, area_especializacion = ?, fecha_nacimiento = ?,
      genero = ?, direccion = ?, telefono = ?, correo_electronico = ?,
      num_carnet = ?, imagen = ?
  WHERE id_abogado = ?;
  
  `;

  const values = [nombre, apellido, area_especializacion, fechaNacimiento, genero, direccion, telefono, correo, num_carnet, imagen, id_abogado];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Abogados:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Abogados' });
    } else {
      res.status(200).json({ message: 'Abogado actualizado exitosamente' });
    }
  });
});

// Ruta para eliminar un registro existente en la tabla Clientes por ID
router.delete('/deleteAbogado/:id_abogado', (req, res) => {
  const id_abogado = req.params.id_abogado;

  const sql = 'DELETE FROM abogados WHERE id_abogado = ?';

  db.query(sql, [id_abogado], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en abogados:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en abogados' });
    } else {
      res.status(200).json({ message: 'abogados eliminado exitosamente' });
    }
  });
});


  // Ruta para crear un nuevo registro en la tabla Clientes
  router.post('/createclientes', (req, res) => {
    const { nombre, correo, telefono } = req.body;
  
    if (!nombre || !correo || !telefono) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
  
    const sql = `INSERT INTO Clientes (nombre, correo, telefono) VALUES (?, ?, ?)`;
    const values = [nombre, correo, telefono];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Clientes:', err);
        res.status(500).json({ error: 'Error al insertar registro en Clientes' });
      } else {
        res.status(201).json({ message: 'Cliente creado exitosamente' });
      }
    });
  });
  
  // Ruta para actualizar un registro existente en la tabla Clientes por ID
  router.put('/updateclientes/:idClientes', (req, res) => {
    const idClientes = req.params.idClientes;
    const { nombre, correo, telefono } = req.body;
  
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es obligatorio' });
    }
  
    const sql = `
      UPDATE Clientes
      SET nombre = ?, correo = ?, telefono = ?
      WHERE idClientes = ?
    `;
  
    const values = [nombre, correo, telefono, idClientes];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Clientes:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Clientes' });
      } else {
        res.status(200).json({ message: 'Cliente actualizado exitosamente' });
      }
    });
  });
  
  // Ruta para eliminar un registro existente en la tabla Clientes por ID
  router.delete('/deleteclientes/:idClientes', (req, res) => {
    const idClientes = req.params.idClientes;
  
    const sql = 'DELETE FROM Clientes WHERE idClientes = ?';
  
    db.query(sql, [idClientes], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Clientes:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Clientes' });
      } else {
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
      }
    });
  });

  router.get('/readclientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de clientes:', err);
        res.status(500).json({ error: 'Error al leer registros de clientes' });
      } else {
        res.status(200).json(result);
      }
    });
  });

// Rutas CRUD para la tabla "Caso"
router.post('/insertcasos', (req, res) => {
  const {
    descripcion,
    fecha_inicio,
    fecha_finalizacion,
    costo_servicio,
    abogados_id_abogado,
    clientes_id_clientes,
    estado,
    
  } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!descripcion || !fecha_inicio || !fecha_finalizacion || !costo_servicio || !abogados_id_abogado || !clientes_id_clientes) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Abogados"
  const casosSql = `
      INSERT INTO casos (descripcion, fecha_inicio, fecha_finalizacion, costo_servicio, abogados_id_abogado, clientes_id_clientes, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const casosValues = [descripcion, fecha_inicio, fecha_finalizacion, costo_servicio, abogados_id_abogado, clientes_id_clientes, estado];

  // Ejecuta la consulta para insertar en la tabla "Abogados"
  db.query(casosSql, casosValues, (err, casoResult) => {
      if (err) {
          console.error('Error al insertar caso:', err);
          res.status(500).json({ error: 'Error al insertar caso' });
      } else {
          // Devuelve un mensaje de éxito como respuesta
          res.status(200).json({ message: 'caso insertado exitosamente' });
      }
  });
});

// Ruta para actualizar un registro existente en la tabla Casos por ID
router.put('/updatecasos/:idCasos', (req, res) => {
  const idCasos = req.params.idCasos;
  const { descripcion, fecha_inicio, fecha_finalizacion, costo_servicio, abogados_id_abogado, clientes_id_clientes, estado } = req.body;

  if (!descripcion || !fecha_inicio || !fecha_finalizacion || !costo_servicio || !abogados_id_abogado || !clientes_id_clientes || !estado) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const sql = `
    UPDATE Casos
    SET descripcion = ?, fecha_inicio = ?, fecha_finalizacion = ?, costo_servicio = ?, abogados_id_abogado = ?, clientes_id_clientes = ?, estado = ?
    WHERE idCasos = ?
  `;

  const values = [descripcion, fecha_inicio, fecha_finalizacion, costo_servicio, abogados_id_abogado, clientes_id_clientes, estado, idCasos];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Casos:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Casos' });
    } else {
      res.status(200).json({ message: 'Caso actualizado exitosamente' });
    }
  });
});

// Ruta para eliminar un registro existente en la tabla Casos por ID
router.delete('/deletecasos/:idCasos', (req, res) => {
  const idCasos = req.params.idCasos;

  const sql = 'DELETE FROM Casos WHERE idCasos = ?';

  db.query(sql, [idCasos], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en Casos:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en Casos' });
    } else {
      res.status(200).json({ message: 'Caso eliminado exitosamente' });
    }
  });
});

// Ruta para leer registros de la tabla Casos
router.get('/readcasos', (req, res) => {
  const sql = 'SELECT * FROM Casos';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de casos:', err);
      res.status(500).json({ error: 'Error al leer registros de casos' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para verificar las credenciales y obtener el rol del usuario
  router.post('/login', (req, res) => {
    const { nombre_Usuario, contrasena } = req.body;

    if (!nombre_Usuario || !contrasena) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND contrasena = ?`;
    db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
      if (err) {
        console.error('Error al verificar credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
      }

      if (result.length === 1) {
        const { rol } = result[0];
        res.json({ rol }); // Devolver el rol si las credenciales son correctas
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    });
  });

  router.get('/readtestimonios', (req, res) => {
    const sql = 'SELECT * FROM Testimonio';

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Testimonio:', err);
        res.status(500).json({ error: 'Error al leer registros de Testimonio' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro en la tabla Testimonio
  router.post('/createtestimonios', (req, res) => {
    const { fecha_testimonio, testimonio, puntuacion } = req.body;

    if (!fecha_testimonio || !testimonio || !puntuacion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql =`INSERT INTO Testimonio (fecha_testimonio, testimonio, puntuacion) VALUES (?, ?, ?)`;
    const values = [fecha_testimonio, testimonio, puntuacion];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al insertar registro en Testimonio' });
      } else {
        res.status(201).json({ message: 'Testimonio creado exitosamente' });
      }
    });
  });

  // Ruta para actualizar un registro existente en la tabla Testimonio por ID
  router.put('/upgradetestimonios/:id_testimonio', (req, res) => {
    const id_testimonio = req.params.id_testimonio;
    const { fecha_testimonio, testimonio, puntuacion } = req.body;

    if (!fecha_testimonio || !testimonio || !puntuacion ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = `
    UPDATE Testimonio
    SET fecha_testimonio = ?, testimonio = ?, puntuacion = ?
    WHERE id_testimonio = ?    
  `;
 
  const values = [fecha_testimonio, testimonio, puntuacion, id_testimonio];


    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Testimonio' });
      } else {
        res.status(200).json({ message: 'Testimonio actualizado exitosamente' });
      }
    });
  });

  // Ruta para eliminar un registro existente en la tabla Testimonio por ID
  router.delete('/deletetestimonios/:id_testimonio', (req, res) => {
    const id_testimonio = req.params.id_testimonio;

    const sql = 'DELETE FROM Testimonio WHERE id_testimonio = ?';

    db.query(sql, [id_testimonio], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Testimonio:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Testimonio' });
      } else {
        res.status(200).json({ message: 'Testimonio eliminado exitosamente' });
      }
    });
  });

return router;

};
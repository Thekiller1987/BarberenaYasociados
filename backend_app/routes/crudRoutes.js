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
router.put('/actualizarabogado/:id', (req, res) => {
  const id = req.params.id;
  const {
    nombre,
    apellido,
    fechaNacimiento,
    genero,
    direccion,
    telefono,
    correo,
    areaEspecializacion,
    imagen
  } = req.body;

  // Verificar que los campos obligatorios no sean nulos o vacíos
  if (!nombre || !apellido || !fechaNacimiento || !genero || !direccion || !telefono || !correo || !areaEspecializacion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  db.query(
    'CALL ActualizarAbogado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, nombre, apellido, fechaNacimiento, genero, direccion, telefono, correo, areaEspecializacion, imagen],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar abogado:', err);
        res.status(500).json({ error: 'Error al actualizar abogado' });
      } else {
        res.status(200).json({ message: 'Abogado actualizado exitosamente' });
      }
    }
  );
});


router.delete('/deleteAbogado/:id', (req, res) => {
  // Obtén el ID del registro a eliminar desde los parámetros de la URL
  const id = req.params.id;
  // Realiza la consulta SQL para eliminar el registro por ID
  const sql = 'DELETE FROM abogados WHERE id_abogado = ?';
  // Ejecuta la consulta
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error al eliminar el registro:', err);
          res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Registro eliminado con éxito' });
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

return router;

};
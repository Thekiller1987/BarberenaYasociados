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







// Rutas CRUD para la tabla "Clientes"

// Ruta para leer registros de la tabla Clientes
router.get('/readclientes', (req, res) => {
  const sql = 'SELECT * FROM Clientes';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Clientes:', err);
      res.status(500).json({ error: 'Error al leer registros de Clientes' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para crear un nuevo cliente
router.post('/createclientes', (req, res) => {
  const { nombre, correo, telefono, abogado_id } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const sql = `INSERT INTO Clientes (nombre, correo, telefono, abogado_id) VALUES (?, ?, ?, ?)`;
  const values = [nombre, correo, telefono, abogado_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro en Clientes:', err);
      res.status(500).json({ error: 'Error al insertar registro en Clientes' });
    } else {
      res.status(201).json({ message: 'Cliente creado exitosamente' });
    }
  });
});

// Ruta para actualizar un cliente por ID
router.put('/updateclientes/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;
  const { nombre, correo, telefono, abogado_id } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const sql = `
    UPDATE Clientes
    SET nombre = ?, correo = ?, telefono = ?, abogado_id = ?
    WHERE id = ?
  `;

  const values = [nombre, correo, telefono, abogado_id, id_cliente];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Clientes:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Clientes' });
    } else {
      res.status(200).json({ message: 'Cliente actualizado exitosamente' });
    }
  });
});

// Ruta para eliminar un cliente por ID
router.delete('/deleteclientes/:id_cliente', (req, res) => {
  const id_cliente = req.params.id_cliente;

  const sql = 'DELETE FROM Clientes WHERE id = ?';

  db.query(sql, [id_cliente], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en Clientes:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en Clientes' });
    } else {
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    }
  });
});

// Rutas CRUD para la tabla "Casos"

// Ruta para leer registros de la tabla Casos
router.get('/readcasos', (req, res) => {
  const sql = 'SELECT * FROM Casos';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Casos:', err);
      res.status(500).json({ error: 'Error al leer registros de Casos' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para crear un nuevo caso
router.post('/createcasos', (req, res) => {
  const { nombre, descripcion, cliente_id } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const sql = `INSERT INTO Casos (nombre, descripcion, cliente_id) VALUES (?, ?, ?)`;
  const values = [nombre, descripcion, cliente_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro en Casos:', err);
      res.status(500).json({ error: 'Error al insertar registro en Casos' });
    } else {
      res.status(201).json({ message: 'Caso creado exitosamente' });
    }
  });
});

// Ruta para actualizar un caso por ID
router.put('/updatecasos/:id_caso', (req, res) => {
  const id_caso = req.params.id_caso;
  const { nombre, descripcion, cliente_id } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  const sql = `
    UPDATE Casos
    SET nombre = ?, descripcion = ?, cliente_id = ?
    WHERE id = ?
  `;

  const values = [nombre, descripcion, cliente_id, id_caso];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro en Casos:', err);
      res.status(500).json({ error: 'Error al actualizar el registro en Casos' });
    } else {
      res.status(200).json({ message: 'Caso actualizado exitosamente' });
    }
  });
});

// Ruta para eliminar un caso por ID
router.delete('/deletecasos/:id_caso', (req, res) => {
  const id_caso = req.params.id_caso;

  const sql = 'DELETE FROM Casos WHERE id = ?';

  db.query(sql, [id_caso], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro en Casos:', err);
      res.status(500).json({ error: 'Error al eliminar el registro en Casos' });
    } else {
      res.status(200).json({ message: 'Caso eliminado exitosamente' });
    }
  });
});

return router;

};
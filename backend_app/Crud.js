
const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Ruta para leer registros
  router.get('/read', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Abogados';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });

  // Ruta para crear un nuevo registro con ID específico
  router.post('/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id, nombre, correo, contraseña } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id || !nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Abogados (ID, nombre, correo, contraseña) VALUES (?, ?, ?, ?)`;
    const values = [id, nombre, correo, contraseña];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ id });
      }
    });
  });

    // Ruta para actualizar un registro existente por ID
  router.put('/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nombre, correo, contraseña } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
      UPDATE Abogados
      SET nombre = ?, correo = ?, contraseña = ?
      WHERE ID = ?
    `;

    const values = [nombre, correo, contraseña, id];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro existente por ID
  router.delete('/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM Abogados WHERE ID = ?';

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
  return router;
};

//Agregar al archivo server.js antes de la definicion de la conexion de la base de datos
// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());


//Agregar rutas al archivo crudRouter dentro de module.exports

  // Ruta para crear un nuevo registro con ID específico
  router.post('/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id, nombre, correo, contraseña } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id || !nombre || !correo || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Abogados (ID, nombre, correo, contraseña) VALUES (?, ?, ?, ?)`;
    const values = [id, nombre, correo, contraseña];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ id });
      }
    });
  });

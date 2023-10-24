const express = require('express');
const router = express.Router();


module.exports = (db) => {
// Ruta para leer registros de la tabla Abogados
router.get('/readabogados', (req, res) => {
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
  
  // Ruta para crear un nuevo registro en la tabla Abogados
  router.post('/createabogados', (req, res) => {
    const { nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad } = req.body;
  
    if (!nombre || !apellido || !correo) {
      return res.status(400).json({ error: 'Todos los campos obligatorios' });
    }
  
    const sql = `INSERT INTO Abogados (nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro en Abogados:', err);
        res.status(500).json({ error: 'Error al insertar registro en Abogados' });
      } else {
        res.status(201).json({ message: 'Abogado creado exitosamente' });
      }
    });
  });
  
  // Ruta para actualizar un registro existente en la tabla Abogados por ID
  router.put('/updateabogados/:id_abogado', (req, res) => {
    const id_abogado = req.params.id_abogado;
    const { nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad } = req.body;
  
    if (!nombre || !apellido || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    const sql = `
      UPDATE Abogados
      SET nombre = ?, apellido = ?, fecha_de_nacimiento = ?, genero = ?, direccion = ?, telefono = ?, correo = ?, especialidad = ?
      WHERE id = ?
    `;
  
    const values = [nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad, id_abogado];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro en Abogados:', err);
        res.status(500).json({ error: 'Error al actualizar el registro en Abogados' });
      } else {
        res.status(200).json({ message: 'Abogado actualizado exitosamente' });
      }
    });
  });
  
  // Ruta para eliminar un registro existente en la tabla Abogados por ID
  router.delete('/deleteabogados/:id_abogado', (req, res) => {
    const id_abogado = req.params.id_abogado;
  
    const sql = 'DELETE FROM Abogados WHERE id = ?';
  
    db.query(sql, [id_abogado], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro en Abogados:', err);
        res.status(500).json({ error: 'Error al eliminar el registro en Abogados' });
      } else {
        res.status(200).json({ message: 'Abogado eliminado exitosamente' });
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
  
  // Ruta para crear un nuevo registro en la tabla Clientes
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
  
  // Ruta para actualizar un registro existente en la tabla Clientes por ID
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
  
  // Ruta para eliminar un registro existente en la tabla Clientes por ID
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
  
  // Ruta para crear un nuevo registro en la tabla Casos
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
  
  // Ruta para actualizar un registro existente en la tabla Casos por ID
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
  
  // Ruta para eliminar un registro existente en la tabla Casos por ID
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
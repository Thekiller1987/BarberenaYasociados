
const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
    router.get('/read', (req, res) => {
        // Utiliza la instancia de la base de datos pasada como parámetro
        // Realizar una consulta SQL para seleccionar todos los registros de la tabla "Abogados"
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

      router.post('/create', (req, res) => {
        // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
        const { nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad } = req.body;
      
        // Verifica si se proporcionaron los datos necesarios
        if (!nombre || !apellido || !correo || !especialidad) {
          return res.status(400).json({ error: 'Nombre, apellido, correo y especialidad son campos obligatorios' });
        }
      
        // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Abogados"
        const sql = 'INSERT INTO Abogados (nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad];
      
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al insertar registro:', err);
            res.status(500).json({ error: 'Error al insertar registro' });
          } else {
            // Devuelve la ID del nuevo registro como respuesta
            res.status(201).json({ id: result.insertId });
          }
        });
      });
  
      router.put('/update/:id', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id = req.params.id;
        
        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad } = req.body;
      
        // Verifica si se proporcionaron los datos necesarios
        if (!nombre || !apellido || !correo || !especialidad) {
          return res.status(400).json({ error: 'Nombre, apellido, correo y especialidad son campos obligatorios' });
        }
      
        // Realiza la consulta SQL para actualizar el registro por ID en la tabla "Abogados"
        const sql = `
          UPDATE Abogados
          SET nombre = ?, apellido = ?, fecha_de_nacimiento = ?, genero = ?, direccion = ?, telefono = ?, correo = ?, especialidad = ?
          WHERE id = ?
        `;
        
        const values = [nombre, apellido, fecha_de_nacimiento, genero, direccion, telefono, correo, especialidad, id];
      
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error('Error al actualizar el registro:', err);
            res.status(500).json({ error: 'Error al actualizar el registro' });
          } else {
            // Devuelve un mensaje de éxito como respuesta
            res.status(200).json({ message: 'Registro actualizado con éxito' });
          }
        });
      });
      router.delete('/delete/:id', (req, res) => {
        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const id = req.params.id;
      
        // Realiza la consulta SQL para eliminar el registro por ID en la tabla "Abogados"
        const sql = 'DELETE FROM Abogados WHERE id = ?';
      
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
            
  
  module.exports = router;
  return router;
};

//Agregar al archivo server.js antes de la definicion de la conexion de la base de datos
// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());



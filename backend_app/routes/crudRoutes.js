const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1987',
  database: 'abogados_firma'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Middleware para parsear JSON
router.use(express.json());

// Rutas CRUD para la tabla "Abogados"

router.post('/insertarabogado', (req, res) => {
  const {
    nombre,
    apellido,
    fechaNacimiento,
    genero,
    direccion,
    telefono,
    correo,
    especialidad,
    imagen
  } = req.body;

  // Verificar que los campos obligatorios no sean nulos o vacíos
  if (!nombre || !apellido || !fechaNacimiento || !genero || !direccion || !telefono || !correo || !especialidad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Verificar si se proporcionó una imagen
  let imagenUrl = null;
  if (imagen && imagen.length > 0) {
    // Guardar la imagen en el servidor o en un servicio de almacenamiento en la nube
    // y obtener la URL de la imagen para almacenarla en la base de datos
    // Ejemplo: imagenUrl = guardarImagenEnServidor(imagen);
  }

  db.query(
    'INSERT INTO Abogados (nombre, apellido, fecha_nacimiento, genero, direccion, telefono, correo_electronico, especialidad, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, fechaNacimiento, genero, direccion, telefono, correo, especialidad, imagenUrl],
    (err, result) => {
      if (err) {
        console.error('Error al insertar abogado:', err);
        res.status(500).json({ error: 'Error al insertar abogado' });
      } else {
        res.status(200).json({ message: 'Abogado insertado exitosamente' });
      }
    }
  );
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

// Ruta para eliminar un abogado por ID
router.delete('/eliminarabogado/:id', (req, res) => {
  const id = req.params.id;

  db.query('CALL EliminarAbogado(?)', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar abogado:', err);
      res.status(500).json({ error: 'Error al eliminar abogado' });
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

module.exports = router;

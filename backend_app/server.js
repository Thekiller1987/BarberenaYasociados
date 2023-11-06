const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Configuración de CORS
app.use(cors());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1987',
  database: 'abogados_firma'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Importar las rutas CRUD
const crudRoutes = require('./routes/CrudRoutes.js');
app.use('/crud', crudRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor backend en funcionamiento!');
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});

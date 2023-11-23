const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'des1',
    password: '0524',
    database: 'abogados_firma'

});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.error('Conexión exitosa a la base de datos');
    }
});

app.use(cors());
app.use(express.json());

const crudRoutes = require('./routes/crudRoutes.js')(db);
app.use('/crud', crudRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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

const crudRoutes = require('./routes/CrudRoutes.js')(db); //Pasa la instancia de la base de datos a crudRoutes
app.use('/crud', crudRoutes);

app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});

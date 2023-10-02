

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
    password: '1987',
    database: 'abogados_firma'

});

db.connect((err) =>{
    if(err){
        console.error('Error de conexion a la base de datos', err);
    }else{
        console.error('Conexion exitosa a la base de datos');
    }
});

app.use(cors());

app.listen(port,()=>{
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);

});

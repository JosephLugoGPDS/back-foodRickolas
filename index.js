const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const bodyParser = require('body-parser');
const routes = require('./routes');

//Cors permite que un cliente se conecte a otro servidor para intercambiar recursos
const cors = require('cors')

//crear el servidor
const app = express();

//DB
dbConnection();

//Lectura y parseo del body, habilitando body-parser
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}))

//habilitando cors
app.use(cors());

//Rutas
app.use('/',routes());

//carpeta publica de uploads para las img
app.use(express.static('uploads'));


//Listened peticiones
app.listen( process.env.PORT,()=>{
    console.log(`Listend in port ${process.env.PORT}`);
})

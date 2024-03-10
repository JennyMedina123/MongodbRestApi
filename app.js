//cargar librería ExpressJS
const express=require('express');
const app=express();

    
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola pros')
   })
//realizar la conexion a la BD
 const { conectar } = require('./modelos/bd');
 conectar();

//Dejar disponibles las rutas a los métodos web
require('./rutas/pais.rutas')(app);


const puerto=3030;

app.listen(puerto,() => {
    console.log(  `Api iniciada y escuchando por el puerto http://localhost:${puerto} `)
});
const { MongoClient } = require('mongodb');
const configBD = require('../configuration/bd.config');
const url = `mongodb://${configBD.SERVIDOR}:${configBD.PUERTO}`;
const client = new MongoClient(url);
let basedatos;
 
module.exports = {
     conectar: async  function () {
        try {
        await client.connect();
        console.log("se ha establecido conexion a la base de datos")
        basedatos = client.db(configBD.BASEDATOS)
        } catch (error) {
            console.log(error)
        }
    },
    obtenerBD: function () {
        return basedatos;
    }
}
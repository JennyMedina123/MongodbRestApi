//cargar la libreria con la conexion a la bd
var bd = require('./bd');
// importar ObjectID library
// ObjectID = require('mongodb').ObjectID;

//constructor
const Pais = async function () { }
//metodo que obtiene la lista de paises
Pais.listar = async function (resultado) {
    //obtener objeto de conexion a la base de datos
    try {
        const basedatos = bd.obtenerBD();
        //Ejecutar la consulta
        const paises = await basedatos.collection('paises')
            //***** Código Mongo *****
            .find()
            .project(
                {
                    id: 1,
                    nombre: 1,
                    continente: 1,
                    tipoRegion: 1,
                    codigoAlfa2: 1,
                    codigoAlfa3: 1,
                    regiones: 1
                })
            //************************
            .toArray();
        resultado(null, paises);
    } catch (err) {
        resultado(err, null);
    }
}

Pais.listarOne = async function (id, resultado) {
    // var objectId = new ObjectID(id);
    //obtener objeto de conexion a la base de datos
    try {
        const basedatos = bd.obtenerBD();
        const query = { id: Number(id) }
        //Ejecutar la consulta
        //***** Código Mongo *****
        const paises = await basedatos.collection('paises')
            .findOne(query,

                {
                    id: 1,
                    nombre: 1,
                    continente: 1,
                    tipoRegion: 1,
                    codigoAlfa2: 1,
                    codigoAlfa3: 1,
                    regiones:1
                }
                )
        // //************************
        resultado(null, paises);
    } catch (err) {
        resultado(err, null);
    }
}

//metodo que agrega un registro
Pais.agregar = async function (pais, resultado) {
    //obtener objeto de conexion a la base de datos
    try {
        const basedatos = bd.obtenerBD();
        //Ejecutar la consulta
        await basedatos.collection('paises')
            //***** Código Mongo *****
            .insertOne(
                {
                    id: pais.id,
                    nombre: pais.nombre,
                    continente: pais.continente,
                    tipoRegion: pais.tipoRegion,
                    codigoAlfa2: pais.codigoAlfa2,
                    codigoAlfa3: pais.codigoAlfa3,
                    regiones: pais.regiones
                });
        //************************
        resultado(null, pais);
    } catch (err) {
        console.error('El pais ya exite', err)
        resultado(err, null);
    }
}
//metodo que modifica un registro
Pais.modificar = async (pais, resultado) => {
    //obtener objeto de conexion a la base de datos
    const basedatos = bd.obtenerBD();
    //Ejecutar la consulta
    try {

        const res = await basedatos.collection('paises')
            //***** Código Mongo *****
            .updateOne(
                { id: pais.id },
                [{
                    $set: {
                        nombre: pais.nombre,
                        continente: pais.continente,
                        tipoRegion: pais.tipoRegion,
                        codigoAlfa2: pais.codigoAlfa2,
                        codigoAlfa3: pais.codigoAlfa3,
                    }
                }]);
        console.log({ res });
        //************************
        if (res.matchedCount == 0) {
            //No se encontraron registros
            console.log("No se actualizó el país ", pais);
            resultado({ mensaje: "No actualizado" }, null);
        }
        resultado(null, { mensaje: "Elemento actualizado" });
    } catch (error) {
        console.log("No se encuentra el registro", err);
        resultado(err, null);
    }
}

//metodo que elimina un registro
Pais.eliminar = async (id, resultado) => {
    //obtener objeto de conexion a la base de datos
    const basedatos = bd.obtenerBD();
    try {
        //Ejecutar la consulta
        const res = await basedatos.collection('paises')
            //***** Código Mongo *****
            .deleteOne({ id: eval(id) })
        //************************

        //La consulta no afectó registros
        if (res.deletedCount == 0) {
            //No se encontraron registros
            console.log("No se encontró el país con id= ", id);
            return resultado({ mensaje: "No encontrado" }, null);
        }
        console.log("Se eliminó con éxito el país con id= ", id);
        resultado(null, res);
    }
    catch (e) {
        console.log("Error eliminando país", e);
        resultado(e, null);
    }
}
module.exports = Pais;

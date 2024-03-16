//cargar la libreria con la conexion a la bd
var bd = require('./bd');
//constructor
const Region = async function () { }
//metodo que obtiene la lista de paises
Region.listar = async function (idPais, resultado) {
    //obtener objeto de conexion a la base de datos
    try {
        const basedatos = bd.obtenerBD();
        //Ejecutar la consulta
        const regiones = await basedatos.collection('paises')
            //***** Código Mongo *****
            .aggregate([
                { $match: { id: eval(idPais) } }
            ]).project({
                'regiones.nombre': 1,
                'regiones.area': 2,
                'regiones.poblacion': 3,
            })
            .toArray();
        resultado(null, regiones[0]['regiones']);
    } catch (err) {
        resultado(err, null);
    }
}
//Metodo que agrega un registro
Region.agregar = async function (idPais, region, resultado) {
    console.log({ id: eval(idPais), region })
    try {
        const basedatos = bd.obtenerBD();
        const res = await basedatos.collection('paises')
            //***** Código MongoDB *****
            .updateOne(
                {
                    id: eval(idPais)
                },
                {
                    $push: {
                        regiones:
                        {
                            nombre: region.nombre,
                            area: region.area,
                            poblacion: region.poblacion
                        }
                    }
                })
        //**************************
        //La consulta no afectó registros
        if (res.modifiedCount == 0) {
            //No se encontraron registros
            console.log("No se encontró el país", region);
            resultado({ message: "Pais No encontrado" }, null);
            return;
        }
        console.log("Región agregada: ", region);
        resultado(null, region);
    } catch (err) {
        console.error("Error agregando región:", err);
        resultado(err, null);
    }
}


//Metodo que modifica un registro
Region.modificar = async (idPais, region, resultado) => {
    const basedatos = bd.obtenerBD();
    try {
        const res = await basedatos.collection('paises')
            //***** Código MongoDB *****
            .updateOne
            ({
                id: eval(idPais),
                regiones: { $elemMatch: { nombre: region.nombre } }
            },
                {
                    $set:
                    {
                        'regiones.$.area': region.area,
                        'regiones.$.poblacion': region.poblacion
                    }
                });
        //**************************
        //La consulta no afectó registros
        if (res.modifiedCount == 0) {
            //No se encontraron registros
            console.log("No se actualizó la región", region.nombre);
            return resultado({ mensaje: "No actualizado" }, null);
        }
        resultado(null, { mensaje: "registro actualizado" });
    } catch (error) {
        console.error("Error actualizando la región:", error);
        resultado(error, null);
    }
}
//Metodo que elimina un registro
Region.eliminar = async (id, nombreRegion, resultado) => {
    const basedatos = bd.obtenerBD();
    try {
        const res = await basedatos.collection('paises')
            //***** Código MongoDB *****
            .updateOne({ id: eval(id) },
                {
                    $pull: {
                        regiones:
                        {
                            nombre: nombreRegion
                        }
                    }
                });
        //**************************
        console.log({ res });
        //Modfied count te dice si el registro fue actualizado o no 0 o 1
        if (res.modifiedCount == 0) {
            //No se encontraron registros
            console.log("No se encontró la región con id=", id);
            return resultado({ mensaje: "No encontrado" }, null);
        }
        console.log("Se eliminó con éxito la region con id= ", id);
        resultado(null, res);

    }
    catch (error) {
        console.error("Error eliminando region", error);
        resultado(error, null);
    }
}
module.exports = Region;
//cargar la libreria con la conexion a la bd
var bd = require('./bd');
//constructor
const Ciudad = async function () { }
//metodo que obtiene la lista de ciudades
Ciudad.listar = async function (idPais, nombreRegion, resultado) {
    //obtener objeto de conexion a la base de datos
    try {
    const basedatos = bd.obtenerBD();
    //Ejecutar la consulta
    const ciudades = await  basedatos.collection('paises')
        //***** Código Mongo *****
        .aggregate([
            {
                $match: { id: eval(idPais), 'regiones.nombre': nombreRegion }
            },
            {
                $project: {
                    regiones: {
                        $filter: {
                            input: '$regiones', as: 'region',
                            cond: { $eq: ['$$region.nombre', nombreRegion] }
                        }
                    }
                }
            }
        ]
        )
        //************************
        .toArray();
        resultado(null, ciudades);
    } catch (error) {
        resultado(err, null);
    }
        
}

//Metodo que agrega un registro
Ciudad.agregar = async function (idPais, nombreRegion, ciudad, resultado) {
    try {
    const basedatos = bd.obtenerBD();
    await basedatos.collection('paises')
        //***** Código MongoDB *****
        .updateOne(
            {
                id: eval(idPais),
                regiones: { $elemMatch: { nombre: nombreRegion } }
            },
            {
                $push: {
                    'regiones.$.ciudades':
                    {
                        nombre: ciudad.nombre,
                        capitalRegion: ciudad.capitalRegion,
                        capitalPais: ciudad.capitalPais
                    }
                }
            });
            //**************************
            resultado(null, ciudad);
        } catch (error) {
            resultado(err, null);
    }
    //         function (err, res) {
    //             //Verificar si hubo error ejecutando la consulta
    //             if (err) {
    //                 console.log("Error agregando ciudad:", err);
    //                 
    //                 return;
    //             }
    //             //La consulta no afectó registros
    //             if (res.modifiedCount == 0) {
    // //No se encontraron registros
    //                 resultado({ mensaje: "No encontrado" }, null);
    //                 console.log("No se encontró la región", err);
    //                 return;
    //             }
    //             
    //             console.log("Ciudad agregada :", ciudad);
    //         }
    //     )
}
//Metodo que modifica un registro
Ciudad.modificar = async (idPais, nombreRegion, ciudad, resultado) => {
    const basedatos = bd.obtenerBD();
    try {
    const res = await basedatos.collection('paises')
        //***** Código MongoDB *****
        .updateOne(
            {
                id: eval(idPais)},
            {
                $set:
                {
                    'regiones.$[region].ciudades.$[ciudad].capitalRegion':
                        ciudad.capitalRegion,
                    'regiones.$[region].ciudades.$[ciudad].capitalPais':
                        ciudad.capitalPais
                }
            },
            {
                arrayFilters: [{ 'region.nombre': nombreRegion }, {
                    'ciudad.nombre': ciudad.nombre
                }],
            });
            //**************************
            resultado(null, ciudad);
        } catch (error) {
            resultado(err, null);
    }
     // console.log({ res });
            // if (err.m) {
            //     console.log("Error actualizando ciudad:", err);
            //     console.log("Ciudad actualizada :", ciudad);
            //     resultado(null, ciudad);
            //     resultado(null,{ mensaje: "No encontrado" }, null); 
            // }
            // if (res.matchedCount == 0) {
            //     //No se encontraron registros
            //     console.log("No se actualizó el país ", pais);
            //     resultado({ mensaje: "No actualizado" }, null);
            // }
    //         resultado(null, { mensaje: "Elemento actualizado" });
    //         } catch (error) {
    //         console.log("No se encontró la región", err);
    //         resultado(err, null);
    // }
    
}
//Metodo que elimina un registro
Ciudad.eliminar = async (idPais, nombreRegion, nombreCiudad, resultado) => {
    const basedatos = bd.obtenerBD();
    try {
    const res = await basedatos.collection('paises')
        //***** Código MongoDB *****
        .updateOne(
            {
                id: eval(idPais),
                regiones: { $elemMatch: { nombre: nombreRegion } }
            },
            {
                $pull: {
                    'regiones.$.ciudades':
                    {
                        nombre: nombreCiudad
                    }
                }
            });
            //**************************
            console.log({ res });
            if (res.modifiedCount == 0) {
                //No se encontraron registros
                console.log("No se encontró la Ciudad", nombreCiudad);
                return resultado({ mensaje: "No encontrado" }, null);
            }
            console.log("Ciudad eliminada con nombre :", nombreCiudad);
            resultado(null, res);
            } catch (error) {
                console.error("Error eliminando ciudad", error);
                resultado(error, null);
            }
               
}
module.exports = Ciudad;
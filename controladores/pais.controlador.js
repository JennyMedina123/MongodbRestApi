//cargar el modelo de paises
const pais = require('../modelos/pais.modelo');
//metodo web para obtener la lista de paises
exports.listar = (req, res) => {
    pais.listar((err, datos) => {
        if (err) {
            return res.status(500).send({ mensaje: 'Error obteniendo la lista de paises' });
        }
        else {
            //devolver los registros obtenidos
            return res.send(datos);
        }
    });
}

exports.listarOne = async (req, res) => {
    let id = req.params.id;

    pais.listarOne(id, (err, datos) => {
        if (err) {
            console.error({err})
            return res.status(500).send({ mensaje: 'Error obteniendo el pais' });
        }
        else {
            //devolver los registros obtenidos
            return res.send(datos);
        }
    });
}
//metodo web para agregar un país
exports.agregar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body || !req.body.id || !req.body.nombre) {
        return res.status(400).send({ mensaje: 'El contenido del mensaje debe incluir la información del país' });
    }
    pais.agregar(req.body,
        (err, datos) => {
            //verificar si hubo error
            if (err) {
                return res.status(500).send({ mensaje: 'El pais ya exite' });
            }
            else {
                return res.send(datos);
            }
        });
}
//metodo web para modificar un país
exports.modificar = (req, res) => {
    //validar que la solicitud tenga datos
    if (!req.body || !req.body.id) {
        return res.status(400).send({ mensaje: 'El contenido del mensaje debe incluir la información del país' });
    }
    pais.modificar(req.body,
        (err, datos) => {

            //verificar si hubo error
            if (err) {
                return res.status(500).send({ mensaje: 'Error modificando el país' });
            }
            else {
                return res.send(datos);
            }
        }
    );
}
//metodo web para eliminar un país
exports.eliminar = (req, res) => {
    pais.eliminar(req.params.id,
        (err, datos) => {
            //verificar si hubo error
            if (err) {
                return res.status(500).send({ mensaje: 'Error eliminando el país' });
            }
            else {
                return res.send({
                    mensaje: `Se eliminó el país con
id=${req.params.id}`
                });
            }
        }
    );
}
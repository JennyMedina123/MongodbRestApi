module.exports = (app) => {
    //Importar el controlador
    const controlPais = require('../controladores/pais.controlador');
    //metodo de la API que obtiene la lista de paises
    app.get("/paises", controlPais.listar);
    //metodo de la API que obtiene un  único pais
    app.get("/paises/:id", controlPais.listarOne);
    //metodo de la API que agrega un país
    app.post("/paises:id", controlPais.agregar);
    //metodo de la API que modifica un país
    app.put("/paises/", controlPais.modificar);
    //metodo de la API que elimina un país
    app.delete("/paises/:id", controlPais.eliminar);
}

var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, modificarProducto, autocompProducts } = require("../bd/productosBD");

ruta.get("/", async (req, res) => res.json(await mostrarProductos()) );

ruta.get("/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/eliminar/:id", async (req, res) => res.json(borrarProducto(req.params.id)) );

ruta.post("/nuevoProducto", async (req, res) => res.json(await nuevoProducto(req.body)) );

ruta.post("/autocompletar", async (req,res)=> res.json([req.body.hint,...await autocompProducts(req.body.hint)]));

ruta.put("/modificarProducto/:id", async (req, res) => {
    const productoModificado = await modificarProducto(req.params.id, req.body);
    res.json(productoModificado);
});

module.exports = ruta;

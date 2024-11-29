var ruta = require("express").Router();
const { usuarios } = require("../bd/conexion");
var { mostrarVentas, nuevaVenta, buscarPorId, cancelarVenta, marcarComoVendida, modificarVenta, borrarVenta } = require("../bd/ventasBD");



// Ruta para mostrar todas las ventas
ruta.get("/", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

// Ruta para buscar una venta por ID
ruta.get("/:id", async (req, res) => {
    const venta = await buscarPorId(req.params.id);
    res.json(venta);
});

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    const ventaValida = await nuevaVenta(req.body);  // Crear nueva venta con los datos del body
    res.json({ ventaValida });
});

// Ruta para cancelar una venta
ruta.put("/cancelarVenta/:id", async (req, res) => {
    const cancelada = await cancelarVenta(req.params.id);  // Cancelar la venta según el ID
    res.json({ cancelada });
});

// Ruta para marcar una venta como vendida
ruta.put("/marcarComoVendida/:id", async (req, res) => {
    const vendida = await marcarComoVendida(req.params.id);  // Marcar la venta como "vendido"
    res.json({ vendida });
});

// Ruta para modificar todos los campos de una venta
ruta.put("/modificarVenta/:id", async (req, res) => {
    const resultado = await modificarVenta(req.params.id, req.body);  // Modificar todos los campos de la venta
    res.json(resultado);
});

// Ruta para borrar una venta por ID
ruta.delete("/eliminar/:id", async (req, res) => {
    const resultado = await borrarVenta(req.params.id);  // Borrar la venta según el ID
    res.json(resultado);
});

module.exports = ruta;
var ruta = require("express").Router();
const { usuarios } = require("../bd/conexion");

var { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, modificarUsuario, login, autocompUsers } = require("../bd/usuariosBD");


ruta.post("/login",async(req,res)=>{
    const usuario=await login(req,req.body.usuario,req.body.password);
    res.json(usuario);
});

ruta.get("/",async(req,res)=>{
    const usuarios=await mostrarUsuarios();
    res.json(usuarios);
});

ruta.get("/:id", async(req, res)=>{
    var usuarioValido= await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

ruta.delete("/eliminar/:id",async(req,res)=>{
    var borrado=await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

ruta.post("/autocompletar", async (req,res)=> res.json([req.body.hint,...await autocompUsers(req.body.hint)]));

ruta.put("/modificarUsuario/:id", async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const resultado = await modificarUsuario(id, datosNuevos);
    res.json(resultado);
});


module.exports=ruta; 
const express = require ("express");
require("dotenv").config(); //con esta linea se recupera en el puerto 4000 y no se usaria en el 3000
const app = express();//a partir de app se crean las rutas

var saludo=(req,res,next)=>{//dos primeros datos, y el ultimo es la funcion, y es un middleware que se ejecuta solo si se llama
console.log("hola");
next();
}

app.use((req,res,next)=>{
    console.log("Middleware para todas las rutas");//cualquier ruta al entrar lo ejecutara
    next();
})

app.get("/",saludo,(req,res)=>{
    res.send("Estas en raiz");
})//aqui dice que se va a programar la raiz//require es para , response para mandar un mensaje a pantalla
app.get("/home",saludo,(req,res)=>{
    res.send("Estas en home");
})
app.get("/trabajo",(req,res)=>{
    res.send("Estas en trabajo");
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});

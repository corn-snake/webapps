const usuariosBD=require("./conexion").usuarios;
const Usuario = require("../clases/usuarioClases");
const { usarios }= require("./conexion");
const {encriptarPassword,validarPassword}=require("../middlewares/funcionesPassword");

function validarDatos(usuario2){
    var datosCorrectos=false;
    if(usuario2.nombre!=undefined && usuario2.usuario!= undefined && usuario2.password!= undefined){
     datosCorrectos=true;
    }
        return datosCorrectos;
}

async function login(req,usuario,password) {
    
    //console.log (usuario, password);

    const usuarios=await usuariosBD.where("usuario","==",usuario).get(); //primero de campo base segundo operacion booleana y 3ero que compara
    var user={
        usuario:"anónimos",
        tipoUsuario:"Sin acceso"
    }
    usuarios.forEach(usu => {
    //console.log(usu.data());
    const passwordValido=validarPassword(password, usu.data().password, usu.data().salt);
    if(passwordValido){
        //console.log("pass");
        
        if(usu.data().tipoUsuario=="usuario"){
            //console.log("usuario");
            
            req.session.usuario=usu.data().usuario;
            user.usuario=req.session.usuario;
            user.tipoUsuario="usuario";

        }else if(usu.data().tipoUsuario=="admin"){
            req.session.admin=usu.data().usuario;
            user.usuario=req.session.admin;
            user.tipoUsuario="admin";
        }
    }
    
    });
return user;
}

async function mostrarUsuarios(){
    const usuarios=await usuariosBD.get();
    //console.log(usuarios);
    var usuariosValidos=[];
    usuarios.forEach(usuario => {
        //console.log(usuario.id);
        const usuario1= new  Usuario({id:usuario.id,...usuario.data()});
        const usuario2 = usuario1.getUsuario;        
        if(validarDatos(usuario2)){
            usuariosValidos.push(usuario2);
        }
    });
    //console.log (usuariosValidos);
    return usuariosValidos;
}
//se crea una funcion que debe dar solo la informacion de un id especifico
async function buscarPorId(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido={error:true};
    if(validarDatos(usuario1.getUsuario)){
    usuarioValido=usuario1.getUsuario
    }
    //console.log(usuarioValido);
    return usuarioValido
}

//inserta un nuevo dato en la base de datos siempre y cuando sea correcto
async function nuevoUsuario(data){
    const {salt, hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    var usuarioValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario)
        usuarioValido=true;
    }
    return usuarioValido;
}

async function borrarUsuario(id) {
    const usuario = buscarPorId(id);
    var borrado=false;
    if(usuario.error!=true){
        await usuariosBD.doc(id).delete();
        borrado=true;
    }
    //console.log(usuario);
    return borrado;
}

async function modificarUsuario(id, data) {
    const usuarioExistente = await buscarPorId(id); // Verifica si el usuario existe
    if (usuarioExistente.error) {
        return { error: "Usuario no encontrado" };
    }

    // Asegúrate de que `tipoUsuario` esté definido, o asigna un valor predeterminado
    data.tipoUsuario = data.tipoUsuario || usuarioExistente.tipoUsuario || "usuario";

    if (data.password) {
        // Si se envía una nueva contraseña, encripta y actualiza
        const { salt, hash } = encriptarPassword(data.password);
        data.password = hash;
        data.salt = salt;
    }

    const usuarioModificado = new Usuario({ id, ...usuarioExistente, ...data });
    if (validarDatos(usuarioModificado.getUsuario)) {
        await usuariosBD.doc(id).set(usuarioModificado.getUsuario); // Actualiza en la base de datos
        return { success: true, usuario: usuarioModificado.getUsuario };
    } else {
        return { error: "Datos no válidos" };
    }
}

async function autocompUsers (hint) {
    const d = (await usuariosBD.where("usuario", ">=", hint).get()).docs.map(e=>e.data().usuario);
    return d;
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario,
    login,
    autocompUsers
};

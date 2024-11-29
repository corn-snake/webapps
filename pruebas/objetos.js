var obj={
    nombre:"Fulanito",
    edad:20
}
/*las llaves son para declarar objetos y como es objeto es con: 
para mas atributos es , y el ultimo no necesita.
*/
console.log(obj);
obj.celular=4271660214;
console.log(obj);
//es = es para agregar otro atributo 
obj.correos={
    correo1:"fulanito@gmail.com",
    correo2:"fulanito@outlook.com"
}
console.log(obj.correos.correo2);//para solo llamar un objeto especifico con un atributo especifico

//otra forma de crear objetos
var persona={};//variable en java no hay tipos de datos
persona.nombre="Paco";//aqui se agregan y "" y '' es lo mismo
console.log(persona);
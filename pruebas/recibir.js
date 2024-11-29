var a=require("./variables");//. dice que esta en la misma carpeta y de ahi se tomara
var obj=require("./variables2");

var{b,c}=require("./variables2");//este es para cuando no quiero cambiar 

var b=require("./variables2").b;//.b es llamar uno especifica variable

console.log(a);
console.log(obj);
console.log(obj.c);// solo llamar uno 
console.log(b);
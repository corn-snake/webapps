import axios from "axios";
import { Timestamp } from "firebase/firestore";
import { sha512 } from "/public/sha512";

const dictionary = {
    products: "productos",
    users: "usuarios"
},
    labels = {
        users: {
            uname: "Usuario", 
            priv: "Nivel de Acceso"
        },
        products: {
            price: "Precio ($MXN)",
            name: "Nombre"
        },
        receipt: {
            idProducto: "Producto",
            amount: "Cantidad",
            idUsuario: "Número de Usuario",
            date: "Fecha y hora",
            status: "Estado"
        },
        prefix: {
            users: {},
            products: {
                price: "$ "
            }
        }
    },
    order = {
        users: ["uname", "priv"],
        products: ["name", "price"]
    },
    modOrder = {
        user: ["uname", "pwd", "priv"],
        product: ["name", "price"],
        receipt: ["idProducto", "amount", "idUsuario", "date", "status"]
    },
    modLabels = {
        user: {
            pwd: "Contraseña",
            priv: "Nivel de Acceso"
        }
    },
    modFuncs = {
        user: {
            priv: parseInt
        },
        product: {
            price: parseFloat
        },
        receipt: {
            idProducto: parseInt,
            amount: parseInt,
            idUsuario: parseInt,
            date: parseInt,
        }
    },
    autocompletable = {
        user: [],
        transaction: ["idProducto", "idUsuario"]
    },
    hide = {
        items: {
            user: ["pwd"],
            transaction: ["date"]
        },
        formulae: {
            user: {
                pwd: (pwd)=>sha512(pwd)
            },
            transaction: {
                date: (dateArrayThree)=>Timestamp.fromDate(new Date(...dateArrayThree))
            }
        }
    },
    userNumber = async()=>await axios.get("http://localhost:8080/api/all/users").then(d=>d.data).then(d=>d.reduce((p,v)=>{p[v.id] = v.uname; return p;},{})),
    productNumber = async()=>await axios.get("http://localhost:8080/api/all/products").then(d=>d.data).then(d=>d.reduce((p,v)=>{p[v.id] = v.name; return p;},{}));
export {dictionary, labels, order, modOrder, productNumber, userNumber, modLabels, modFuncs, autocompletable, hide};
const admin = require("firebase-admin");
const keys=require("../keys.json");


admin.initializeApp({
    credential:admin.credential.cert(keys)
});

const bd=admin.firestore();
const usuarios=bd.collection("users");
const productos=bd.collection("products");
const ventas = bd.collection("transactions");

module.exports={
    usuarios,
    productos,
    ventas
}
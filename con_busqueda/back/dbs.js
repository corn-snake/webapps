const { collection, getDoc, query, doc, where, getDocs, setDoc, Timestamp, orderBy, limit, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const {db, auth} = require('./fbinit.js');
const crypto = require("crypto");

const usersDB = collection(db, "users"),
    productsDB = collection(db, "products"),
    transactsDB = collection(db, "transactions");

const eq = (thing, field="id") => where(field, "==", thing),
    bw = (thing, field="name") => where(field, ">=", thing),
    intIf = (field, ...include)=>include.includes(field) ? parseInt : (e)=>e,
    intIfnt = (field, ...exclude)=>!(exclude.includes(field)) ? parseInt : (e)=>e,
    adaptIntEq = (thing, field, ...include)=>eq(intIf(field, ...include)(thing), field),
    adaptIntWithDefault = (field, def, ...exclude)=> exclude.includes(field) ? def : field,
    queryWhere = (col, value, field=undefined) => query(col,eq(value, field)),
    queryBw = (col, value, field=undefined) => query(col, bw(value,field)),
    multiWhere = (obj)=> [...(Object.keys(obj).map(k=>eq(obj[k], k)))],
    queryMultiWhere = (col, obj)=>query(col, ...multiWhere(obj)),
    getSingleDocMatching = async (col, value, field=undefined) => (await getDocs(queryWhere(col, value,field))).docs[0],
    getSingleDocMultiMatch = async (col, obj)=>(await getDocs(queryMultiWhere(col, obj))).docs[0],
    getManyDocsMatching = async (col, value, field=undefined)=> (await getDocs(queryWhere(col, value, field))).docs,
    autocomplete = async (col, value, field=undefined)=> (await getDocs(queryBw(col, value, field))).docs,
    checkFor = async (col, value, field="name", id=undefined)=>{
        try {
            if (id) if (await getSingleDocMultiMatch(col, {id, [field]: value})) return true;
            if (await getSingleDocMatching(col, {[field]: value})) return true;
            return false;
        } catch (e) {
            return false;
        }
    };

const getUser = async(val, type="id") => {
        if (type == "pwd") return false;
        const u = (await getSingleDocMatching(usersDB, intIf(type, "id")(val), type));
        if (!u) return false;
        return u.data(); 
    },
    getProduct = async (val, type = "id") =>{
        if (type == "price") return false;
        const u = await getSingleDocMatching(productsDB, intIf(type, "id")(val), type)
        if (!u) return false;
        return u.data();
    },
    getReceipt = async(id, idProducto) =>(await getSingleDocMultiMatch(transactsDB, {id, idProducto})).data(),
    getTransaction = async (val) => (await getDocs(await query(transactsDB, where("id", "==", parseInt(val))))).docs.map(i=>i.data()),
    getAllUsers = async()=>(await getDocs(usersDB)).docs.map(d=>d.data()),
    getAllProducts = async () => (await getDocs(productsDB)).docs.map(d => d.data()),
    getAllTransactions = async () => {
        const d = (await getDocs(transactsDB)).docs,
            red = d.reduce((agg,e,i,[]) => {
                const it = e.data();
                agg.has(it.id) ? agg.get(it.id).push(it) : agg.set(it.id, [it]);
                return agg;
            }, new Map());
        return Object.fromEntries(red.entries());
    },

    makeUser = async (uname, pwdhash, priv=0) =>{
        if (((await getDocs(query(usersDB, where("uname", "==", uname)))).docs).length != 0) return false;
        const salt = crypto.randomBytes(32).toString("hex");
        const u = await addDoc(usersDB, {
            uname,
            pwd: crypto.scryptSync(pwdhash, salt, 100000, 64, "sha512").toString("hex"),
            priv,
            salt,
            id: (await getDocs(await query(usersDB, orderBy("id", "desc"), limit(1)))).docs[0].data().id + 1
        }).then(d => true);
        return u;
    },
    makeProduct = async (name, price) => (await addDoc(productsDB, {
        name,
        price,
        id: (await getDocs(await query(productsDB, orderBy("id", "desc"), limit(1)))).docs[0].data().id + 1
    }).then(d => true)),
    makeSubReceipt = async (amount, buyer, dateString, id, product) => (await addDoc(transactsDB, {
        amount, idUsuario: buyer,
        date: Timestamp.fromDate(new Date(dateString)),
        id,
        idProducto: product,
        status: "vendido"
    }).then(d => true)),
    makeTransaction = async(buyer, dateString, products)=>{
        const id = (await getDocs(await query(transactsDB, orderBy("id", "desc"), limit(1)))).docs[0].data().id + 1;
        Object.keys(products).forEach(async k=>await makeSubReceipt(products[k], buyer, dateString, id, parseInt(k)));
    },

    deleteUser = async (id) => await deleteDoc(doc(db, "users", (await getSingleDocMatching(usersDB, parseInt(id))).id)).then(d => true),
    deleteProd = async (id) => await deleteDoc(doc(db, "products", (await getSingleDocMatching(productsDB, parseInt(id))).id)).then(d => true),
    deleteReceipt = async(id,prod)=>{
        const o = {
            id: parseInt(id), idProducto: parseInt(prod)
        }
        const e = await getSingleDocMultiMatch(transactsDB, o);
        const d = await deleteDoc(doc(db, "transactions", (await e).id));
        return (await d);
    },
    deleteTransaction = async(id) => (await getManyDocsMatching(transactsDB, parseInt(id))).forEach(async e => {
        await deleteDoc(doc(db, "transactions", e.id));
        return true;
    }),
    
    cancelReceipt = async(id, prod)=> await updateDoc(doc(db, "transactions", (await getSingleDocMultiMatch(transactsDB, {
        id: parseInt(id), idProducto: parseInt(prod)
    })).id), {
        status: "cancelado"
    }).then(d => true),
    cancelTransaction = async(id)=> (await getManyDocsMatching(transactsDB, parseInt(id))).forEach(async e=>await updateDoc(doc(db, "transactions", e.id), { status: "cancelado" })),
    
    changeUser = async (obj) => (await updateDoc(doc(db, "users", (await getSingleDocMatching(usersDB, obj.id)).id), 
        Object.keys(obj).reduce((p, v)=>{
            ["uname", "pwd", "salt", "priv"].includes(v) ? p[v] = obj[v] : "";
            return p;
        },{})
    ).then(d => true)),
    changeProduct = async (obj) => (await updateDoc(doc(db, "products", (await getSingleDocMatching(productsDB, obj.id)).id),
        Object.keys(obj).reduce((p, v) => {
            ["name", "price"].includes(v) ? p[v] = obj[v] : "";
            return p;
        }, {})
    ).then(d => true)),
    changeReceipt = async (obj) => (await updateDoc(doc(db, "transactions", (await getSingleDocMultiMatch(transactsDB, {
        id: parseInt(obj.id),
        idProducto: parseInt(obj.idProducto)
    })).id), 
        Object.keys(obj).reduce((p, v) => {
            ["idUsuario", "idProducto", "status", "date", "amount"].includes(v) ? p[v] = obj[v] : "";
            return p;
        }, {})
    ).then(d=>true)),
    
    userExists = async (uname) => await checkFor(usersDB, uname, "uname"),
    uidExists = async (uid)=>(await getSingleDocMatching(usersDB, uid)).exists(),
    receiptExists = async (idt, idp) => (await getSingleDocMultiMatch(transactsDB, {id: idt, idProducto: idp}).then(e=>e.id).catch(er=>false));

    module.exports = {
        getSingleDocMatching, getUser, getProduct, getTransaction, getAllUsers, getAllProducts, getAllTransactions, makeUser, makeProduct, makeSubReceipt, makeTransaction, deleteProd, deleteUser, cancelReceipt, cancelTransaction, changeUser, changeProduct, changeReceipt, checkFor, autocomplete, userExists, receiptExists, getReceipt, uidExists
    }

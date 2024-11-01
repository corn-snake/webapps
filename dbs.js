const { collection, getDoc, query, doc, where, getDocs, setDoc, Timestamp, orderBy, limit, addDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const {db, auth} = require('./../fbinit.js');

const usersDB = collection(db, "users"),
    productsDB = collection(db, "products"),
    transactsDB = collection(db, "transactions");

const eq = (thing, field="id") => where(field, "==", thing),
    intIf = (field, ...include)=>include.includes(field) ? parseInt : (e)=>e,
    intIfnt = (field, ...exclude)=>!(exclude.includes(field)) ? parseInt : (e)=>e,
    adaptIntEq = (thing, field, ...include)=>eq(intIf(field, ...include)(thing), field),
    adaptIntWithDefault = (field, def, ...exclude)=> exclude.includes(field) ? def : field,
    queryWhere = async(col, value, field=undefined) => await query(col,eq(value, field)),
    getSingleDocMatching = async(col, value, field=undefined) => (await getDocs(await queryWhere(col, value,field))).docs[0];

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

    makeUser = async (uname, pwdhash) => (((await getDocs(await query(usersDB, where("uname", "==", uname)))).docs).length == 0 ? await addDoc(usersDB, {
        uname,
        pwd: pwdhash,
        id: (await getDocs(await query(usersDB, orderBy("id", "desc"), limit(1)))).docs[0].data().id + 1
    }) : false),
    makeProduct = async (name, price) => (await addDoc(productsDB, {
        name,
        price,
        id: (await getDocs(await query(productsDB, orderBy("id", "desc"), limit(1)))).docs[0].data().id + 1
    })),
    makeSubReceipt = async (amount, buyer, dateString, id, product) => (await addDoc(transactsDB, {
        amount, buyer,
        date: Timestamp.fromDate(new Date(dateString)),
        idn:id,
        prod_id: product
    })),

    deleteUser = async(id)=>await deleteDoc(doc(db, "users", (await getSingleDocMatching(usersDB, parseInt(id))).id)),
    deleteProd = async (id) => await deleteDoc(doc(db, "products", (await getSingleDocMatching(productsDB, parseInt(id))).id))
    /*deleteTransaction = async (id) => await deleteDoc(doc(db, "users", (await getSingleDocMatching(usersDB, id, "id")).id))
    
    /*changeUser = async (id, uname, pwdhash) => (await updateDoc(await getSingleDocMatching(usersDB, id, "id"), ))*/;

    module.exports = {
        getUser, getProduct, getTransaction, getAllUsers, getAllProducts, getAllTransactions, makeUser, makeProduct, makeSubReceipt, deleteProd, deleteUser
    }

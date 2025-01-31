const router = require("express").Router();
const { getAllProducts, getAllUsers } = require("./../../dbs.js");

router.post("/user/:type", async (r,s)=>s.send((await getAllUsers()).filter(e=>(`${e[r.params.type]}`).startsWith(r.body.txt))));
router.post("/product/:type", async (r, s) => s.send((await getAllProducts()).filter(e => (`${e[r.params.type]}`).startsWith(r.body.txt))));

module.exports = router;
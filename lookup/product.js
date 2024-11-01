const router = require("express").Router();
const { getProduct } = require("./../dbs.js");

router.get("/id/:id", async (r, s) => s.send(await getProduct(r.params.id)));
router.get("/name/:id", async (r, s) => s.send(await getProduct(r.params.id, "name")));

module.exports = router;
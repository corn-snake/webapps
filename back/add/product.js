const router = require("express").Router();
const { makeProduct } = require("./../dbs.js");

router.post("/", async (r, s) => s.send(await makeProduct(r.body.name, r.body.price)));

module.exports = router;
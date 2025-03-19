const { changeProduct } = require("../dbs");

const router = require("express").Router();

router.patch("/", async(r, s) => s.send(await changeProduct(r.body)));

module.exports = router;
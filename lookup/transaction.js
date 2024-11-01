const router = require("express").Router();
const { getTransaction } = require("./../dbs.js");

router.get("/:id", async (r, s) => s.send(await getTransaction(r.params.id)));

module.exports = router;
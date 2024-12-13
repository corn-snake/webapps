const router = require("express").Router();
const { getTransaction, getReceipt } = require("./../dbs.js");

router.get("/:id", async (r, s) => s.send(await getTransaction(r.params.id)));
router.get("/:id/:prod", async (r, s) => s.send(await getReceipt(parseInt(r.params.id), parseInt(r.params.prod))));

module.exports = router;
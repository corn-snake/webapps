const router = require("express").Router();
const { makeSubReceipt } = require("./../dbs.js");

router.post("/", async (r, s) => s.send(await makeSubReceipt(r.body.amount, r.body.id, r.body.time, r.body.id, r.body.product)));

module.exports = router;
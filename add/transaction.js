const router = require("express").Router();
const { makeSubReceipt, makeTransaction } = require("./../dbs.js");

router.post("/", async (r, s) => s.send(await makeTransaction(r.body.user, r.body.date, r.body.products)));
router.post("/single", async (r, s) => s.send(await makeSubReceipt(r.body.amount, r.body.user, r.body.date, r.body.id, r.body.product)));

module.exports = router;
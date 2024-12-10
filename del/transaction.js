const { deleteReceipt, deleteTransaction, cancelTransaction, cancelReceipt } = require("../dbs");

const router = require("express").Router();

router.delete("/:id/all", async (r, s) => s.send(await cancelTransaction(r.params.id)));
router.delete("/:id/:prod", async (r, s) => s.send(await cancelReceipt(r.params.id, r.params.prod)));

module.exports = router;
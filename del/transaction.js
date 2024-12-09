const { deleteReceipt, deleteTransaction } = require("../dbs");

const router = require("express").Router();

router.delete("/:id/p/:prod", async (r, s) => s.send(await deleteReceipt(r.params.id, r.params.prod)));
router.delete("/:id/all", async (r, s) => s.send(await deleteTransaction(r.params.id)));

module.exports = router;
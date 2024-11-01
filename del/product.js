const { deleteProd } = require("../dbs");

const router = require("express").Router();

router.delete("/:id", async (r, s) => s.send(await deleteProd(r.params.id)));

module.exports = router;
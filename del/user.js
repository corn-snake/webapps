const { deleteUser } = require("../dbs");

const router = require("express").Router();

router.delete("/:id", async(r, s)=>s.send(await deleteUser(r.params.id)));


module.exports = router;
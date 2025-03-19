const { deleteUser } = require("../../dbs_mongo");
const { checkAdm } = require("../../tokenFuncs/interpret");

const router = require("express").Router();

router.delete("/:id", async(r, s)=>s.send(checkAdm(r.cookies.auth) ? await deleteUser(r.params.id) : false));


module.exports = router;
const router = require("express").Router();
const { checkAdm } = require("../tokenFuncs/interpret");
const { getAllUsers } = require("./../dbs_mongo");

router.get("/", async (r, s) => checkAdm(r.cookies.auth) ? s.send(await getAllUsers()) : s.send(false));

module.exports = router;
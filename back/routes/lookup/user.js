const router = require("express").Router();
const {getUser, getAllUsers, getUserId} = require("../../dbs_mongo");
const { modCheck } = require("../../tokenFuncs/interpret");

router.get("/id/:id", async (r, s) => s.send(await getUserId(r.params.id)));
router.get("/name/:id", async (r, s) => s.send(modCheck(r, r.params.id) ? await getUser(r.params.id) : s.send(false)));
router.get("/all", async (r,s) => s.send(await getAllUsers()));

module.exports = router;
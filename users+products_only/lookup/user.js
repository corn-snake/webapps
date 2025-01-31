const router = require("express").Router();
const {getUser} = require("./../dbs.js");

router.get("/id/:id", async (r, s) => s.send(await getUser(r.params.id)));
router.get("/name/:id", async (r, s) => s.send(await getUser(r.params.id, "uname")));

module.exports = router;
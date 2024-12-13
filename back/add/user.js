const router = require("express").Router();
const { makeUser } = require("./../dbs.js");

router.post("/", async(r, s) => s.send(await makeUser(r.body.username, r.body.hash, r.body.priv)));

module.exports = router;
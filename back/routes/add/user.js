const router = require("express").Router();
const { makeUser } = require("../../dbs_mongo.js");

router.post("/", async(r, s) => s.send(await makeUser(await r.body)));

module.exports = router;
const { getAllUsers } = require("./dbs.js");

const express = require("express"),
    router = express();

router.use(express.json());

router.get("/", async(r,s) => s.send(await getAllUsers()));
router.use("/read", require('./lookup.js'));
router.use("/all", require('./alls.js'));
router.use("/create", require("./add.js"));
router.use("/del", require("./delete.js"));

module.exports = router;
const { makeUser } = require("../dbs_mongo");

const express = require("express"),
    router = express.Router();

//router.get("/", async(r,s) => s.send(await getAllUsers()));
router.use("/read", require('./lookup'));
router.use("/all", require('./all'));
router.use("/create", require('./add'));
router.use("/del", require("./del"));
router.use("/mod", require("./mod/user"));
router.use("/login", require("./login"));

module.exports = router;
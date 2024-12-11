const express = require("express"),
    router = express.Router();

// router.get("/", async(r,s) => s.send(await getAllUsers()));
router.use("/read", require('./lookup.js'));
router.use("/all", require('./alls.js'));
router.use("/create", require("./add.js"));
router.use("/del", require("./delete.js"));
router.use("/mod", require("./modify.js"));
router.use("/login", require("./login.js"));

module.exports = router;
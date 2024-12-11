const router = require("express").Router();

router.use("/all", require("./alls"));
router.use("/user", require("./lookup/user"));
router.use("/prod", require("./lookup/product"));
router.use("/transaction", require("./lookup/transaction"));

module.exports = router;
const router = require("express").Router();

router.use("/user", require("./add/user"));
router.use("/product", require("./add/product"));
router.use("/transaction", require("./add/transaction"));
router.use("/receipt", require("./add/transaction"));

module.exports = router;
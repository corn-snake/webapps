const router = require("express").Router();

router.use("/user", require("./mod/user"));
router.use("/product", require("./mod/product"));
router.use("/transaction", require("./mod/transaction"));
router.use("/receipt", require("./mod/transaction"));

module.exports = router;
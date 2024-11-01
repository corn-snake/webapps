const router = require("express").Router();

router.use("/user", require("./del/user"));
router.use("/product", require("./del/product"));
// router.use("/transaction", require("./del/transaction"));

module.exports = router;
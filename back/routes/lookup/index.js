const router = require("express").Router();

router.use("/all", require("../all"));
router.use("/user", require("./user"));
/*router.use("/product", require("./lookup/product"));
router.use("/transaction", require("./lookup/transaction"));
router.use("/receipt", require("./lookup/transaction"));*/

module.exports = router;
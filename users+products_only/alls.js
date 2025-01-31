const router = require("express").Router();
const { getAllUsers, getAllTransactions, getAllProducts } = require("./dbs.js");

router.get("/users", async (r, s) => s.send(await getAllUsers()));
router.get("/transactions", async (r, s) => s.send(await getAllTransactions()));
router.get("/products", async (r, s) => s.send(await getAllProducts()));

module.exports = router;
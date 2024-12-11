const { changeProduct } = require("../dbs");

const router = require("express").Router();

router.put("/", (r, s) => s.send(changeProduct(r.body)));
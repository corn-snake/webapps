const { changeReceipt } = require("../dbs");

const router = require("express").Router();

router.put("/", (r, s) => s.send(changeReceipt(r.body)));
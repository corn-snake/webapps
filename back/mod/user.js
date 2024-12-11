const { changeUser } = require("../dbs");

const router = require("express").Router();

router.put("/", (r,s)=>s.send(changeUser(r.body)));
const express = require("express"),
    router = express(),
    utils = require("./mw");

router.get("/first/", (r,s)=>s.send(utils.time_string(1)));
router.get("/second/", (r,s)=>s.send(utils.time_string(2)));

router.listen(8080);

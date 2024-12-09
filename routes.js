const express = require("express"),
    router = express(),
    utils = require("./mw");

router.get("/", (r,s)=>s.send(`<a href="first">primera ruta</a><br><a href="second">segunda ruta</a>`) && console.log("base"));
router.get("/first/", (r, s) => s.send(utils.time_string(1)) && console.log(utils.log_time(1)));
router.get("/second/", (r, s) => s.send(utils.time_string(2)) && console.log(utils.log_time(2)));

module.exports = router;

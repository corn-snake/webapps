const express = require("express"),
    router = express(),
    utils = require("./mw");

router.get("/", (r,s)=>s.send(`<a href="first">primera ruta</a><br><a href="second">segunda ruta</a>`));
router.get("/first/", (r,s)=>s.send(utils.time_string(1)));
router.get("/second/", (r,s)=>s.send(utils.time_string(2)));

module.exports = router;

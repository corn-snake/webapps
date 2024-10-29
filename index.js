const express = require("express"),
    router = express();

router.get("/", (r,s)=>s.send(`Bienvenue.\nHoy es: ${(new Date()).toISOString()}`));

router.listen(8080);

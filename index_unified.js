const express = require("express"),
    router = express();
const cookieParser = require('cookie-parser');
const env = require("./back/process");
    next = require('next');

const _port = process.env.PORT_SERVE || 8080,
    dev = process.env.NODE_ENV !== "production",
    dir = process.env.ROOT_SITE,
    app = next({ dev, dir }),
    handle = app.getRequestHandler();

router.use(express.json());

router.use(require("cors")({ origin: "http://localhost:" + env.PORT_SERVE, credentials: true }));

router.use(cookieParser());

router.use("/api", require("./back/routes"));


router.get("*", (r,s)=>handle(r,s));

app.prepare().then(() => {
    // Start listening to the Express.js Server
    router.listen(_port, (err) => {
        if (err) throw err;
        console.log(_port);
    });
});
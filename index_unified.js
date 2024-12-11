const express = require("express"),
    router = express();
const session = require("express-session");
require('dotenv').config();
const { createServer } = require('http'),
    { parse } = require('url'),
    next = require('next');

const _port = process.env.PORT_SERVE || 8080,
    dev = process.env.NODE_ENV !== "production",
    dir = process.env.ROOT_SITE,
    app = next({ dev, dir }),
    handle = app.getRequestHandler();

router.use(express.json());

router.use(session({
    secret: process.env.SEC,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));

router.use(require("cors")({ origin: "http://localhost:8080", credentials: true }));

router.use("/api", require("./back/routes"));

router.get("*", (r,s)=>handle(r,s));

app.prepare().then(() => {
    // Start listening to the Express.js Server
    router.listen(_port, (err) => {
        if (err) throw err;
        console.log(_port);
    });
});
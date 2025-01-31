const { createServer } = require('http'),
    { parse } = require('url'),
    next = require('next');

require('dotenv').config();

const port = parseInt(process.env.PORT_SITE || '8080', 10),
    dev = process.env.NODE_ENV !== "production",
    dir = process.env.ROOT_SITE,
    app = next({ dev, dir }),
    handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port)

    console.log(
        `> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV
        }`
    )
})
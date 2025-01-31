const router = require("./back/routes.js");
require('dotenv').config();
const _port = process.env.PORT_API;

console.log(_port);

router.listen({ port: _port });

const router = require("./routes.js");
require('dotenv').config();
const _port = process.env.PORT;

console.log(_port);

router.listen({ port: _port });

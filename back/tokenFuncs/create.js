const env = require("../process");
const jwt = require("jsonwebtoken");

const masUnDia = () => Math.floor(Date.now() / 1000) * 1000 + 26 * 60 * 60 * 1000;

const make = (nombre) => jwt.sign(nombre, env.SEC);

module.exports = {masUnDia, make};
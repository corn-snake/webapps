const jwt = require("jsonwebtoken");
const env = require("../process");
const { getUser } = require("../dbs_mongo");

const check = async (r) => r.cookies.auth !== undefined && jwt.verify(r.cookies.auth, env.SEC) ? await getUser(jwt.verify(r.cookies.auth, env.SEC)) : false;
const checkAdm = async (r) => (await check(r)).status == "admin" || false;
const modCheck = async (r, requestedName) => await checkAdm(r) || jwt.verify(r.cookies.auth, env.SEC) == requestedName;

module.exports = {check, checkAdm, modCheck};
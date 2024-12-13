const crypto = require("crypto");
const { changeUser, userExists, uidExists } = require("../dbs");

const router = require("express").Router();

router.patch("/", async(r,s)=>{
    if (!(await uidExists(r.body.id))) return s.send(false);
    if (r.body.uname !== undefined && (await userExists(r.body.uname))) return s.send(false);
    let c = r.body;
    if (r.body.pwd !== undefined) {
        c["salt"] = crypto.randomBytes(32).toString("hex");
        c["pwd"] = crypto.scryptSync(r.body.pwd, salt, 100000, 64, "sha512").toString("hex");
    }
    return s.send(await changeUser(c));
    
});

module.exports = router;
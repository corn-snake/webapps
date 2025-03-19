const crypto = require("crypto");
const { editUser } = require("./../../dbs_mongo");

const router = require("express").Router();

router.patch("/:id", async(r,s)=>{
    let c = r.body;
    if (r.body.pwd !== undefined) {
        c.salt = crypto.randomBytes(32).toString("hex");
        c.pwd = crypto.scryptSync(r.body.pwd, c.salt, 64, "sha512").toString("hex");
    }
    return s.send(await editUser(r.params.id,c));
    
});

module.exports = router;
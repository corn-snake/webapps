const router = require("express").Router();
const { getUser } = require("./dbs");
const { scryptSync } = require("crypto");

router.post("/",async(r,s)=>{
    if (r.body.uname.length < 6) return s.send(false);
    try {
        const match = await getUser(r.body.uname, "uname");
        if (scryptSync(r.body.pw, (await match).salt, 100000, 64, "sha512").toString("hex") == (await match).pwd) {
            r.session.user = r.body.uname;
            return s.send(true);
        }
    } catch (e) {
        return s.send(false);
    }
    return s.send(false);
});

const check = (r)=>r.session.user ? true : false;
const checkRights = async (r)=>r.session.user && (await getUser(r.session.user, "uname")).priv != 0;

router.get("/check", (r,s)=>s.send(check(r)));
router.get("/checkAdmin", async (r,s)=>s.send(await checkRights(r)));

module.exports = router;
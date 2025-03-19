const router = require("express").Router();
const { getUser } = require("../dbs_mongo");
const { scryptSync } = require("crypto");
const { make, masUnDia } = require("../tokenFuncs/create");
const { check, checkAdm } = require("../tokenFuncs/interpret");

router.post("/",async(r,s)=>{
    try {
        const nombre = r.body.nombre,
            match = await getUser(r.body.nombre);
        if (scryptSync(r.body.pwHash, match.salt, 64, "sha512").toString("hex") == match.pwd) {
            return s.cookie("auth", make(nombre), {maxAge: masUnDia()}).send(true);
        }
    } catch (e) {
        console.log(e);
        return s.send(false);
    }
    return s.send(false);
});

router.get("/check", async(r,s)=>s.send(await check(r)));
router.get("/checkAdmin", async (r, s) => s.send(await checkAdm(r)));

module.exports = router;
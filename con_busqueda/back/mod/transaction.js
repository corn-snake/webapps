const { changeReceipt, receiptExists } = require("../dbs");

const router = require("express").Router();

router.patch("/", async(r, s) =>{
    console.log(r.body)
    if (r.body.id !==undefined && r.body.idProducto!==undefined && (await receiptExists(r.body.id, r.body.idProducto))) s.send(await changeReceipt(r.body))
    else s.send(false)
});

module.exports = router;
const { receiptExists, changeReceipt } = require("../dbs");

const express = require("express"),
    router = express.Router();

router.patch("/receipt", async(r,s)=>
    r.body.id !== undefined && r.body.idProducto !== undefined && (await receiptExists(r.body.id, r.body.idProducto)) ?
        s.send(await changeReceipt({id: r.body.id, idProducto: r.body.idProducto, status: "vendido"}))
    : s.send(false)
);

module.exports = router;
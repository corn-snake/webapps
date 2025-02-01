import { Router } from "jsr:@oak/oak/router";
import show from "./show.js";
import add from "./add.js";
import edit from "./edit.js";
import del from "./delete.js";

const r = new Router()
    .use("/show", show.routes(), show.allowedMethods())
    .use("/add", add.routes(), add.allowedMethods())
    .use("/edit", edit.routes(), edit.allowedMethods())
    .use("/delete", del.routes(), del.allowedMethods())
    .get("/(.*)", ctx=>{
        ctx.response.status = 404;
        ctx.response.body = "NOT_FOUND";
    });

export default r;
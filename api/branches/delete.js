import { Router } from "jsr:@oak/oak/router";
import { _delUser } from "../db/roots/delete.js";

const del = new Router()
    .delete("/:uid", async ctx=>{
        ctx.response.body = await _delUser(ctx.params.uid);
    });

export default del;
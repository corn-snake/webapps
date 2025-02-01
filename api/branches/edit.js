import { Router } from "jsr:@oak/oak/router";
import { _editUser } from "../db/roots/edit.js";

const edit = new Router()
    .patch("/:uid", async ctx=>{
        ctx.response.body = await _editUser(ctx.params.uid, ctx.request.body).then(() =>"Usuario actualizado correctamente");
    });

export default edit;
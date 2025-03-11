import { Router } from "jsr:@oak/oak/router";
import { _delUser } from "../db/roots/delete.js";
import { adminIsLoggedIn, verifyClaimant } from "../db/roots/auth.js";

const del = new Router()
    .delete("/:uid", async ctx=>
        await adminIsLoggedIn(ctx) || verifyClaimant(ctx, ctx.params.uid) ? ctx.response.body = await _delUser(ctx.params.uid).then(() => "Usuario borrado correctamente.").catch(e => e.errorResponse.errmsg) : false
    );

export default del;
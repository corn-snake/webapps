import { Router } from "jsr:@oak/oak/router";
import { _addPwd, _editUser, _toggleUserPrivilege } from "../db/roots/edit.js";

const edit = new Router()
    .patch("/:uid", async ctx=>
        await adminIsLoggedIn(ctx) || verifyClaimant(ctx, ctx.params.uid) ? ctx.response.body = await _editUser(ctx.params.uid, await ctx.request.body.json()).then(() => "Usuario actualizado correctamente").catch(e => console.log(e)) : false
    )
    .patch("/changeUserType/:uid", async ctx =>
        await adminIsLoggedIn(ctx) ? ctx.response.body = await _toggleUserPrivilege(ctx.params.uid).then(async u =>`${await u.nombre} ahora es ${await u.status}`) : false
    )
    .patch("/password/:uid", async ctx =>
        await adminIsLoggedIn(ctx) || verifyClaimant(ctx, ctx.params.uid) ? ctx.response.body = await _addPwd(ctx.params.uid, await ctx.request.body.json()).then(async u=>`Final hash: ${await u.pwd}`).catch(e=> console.log(e)) : false
    );

export default edit;
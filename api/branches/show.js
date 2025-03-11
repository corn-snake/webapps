import { Router } from "jsr:@oak/oak/router";
import { showAll, showId, online, isOnline } from "../db/roots/show.js";
import { adminIsLoggedIn, verifyClaimant } from "../db/roots/auth.js";

const show = new Router()
    .get("/all", async ctx=>{
        await adminIsLoggedIn(ctx) ? ctx.response.body = await showAll() : false;
    })
    .get("/logged", async ctx => ctx.response.body = await online())
    .get("/online/:uid", async ctx=>ctx.response.body = await isOnline(ctx.params.uid))
    .get("/:uid", async ctx=>{
        await adminIsLoggedIn(ctx) || await verifyClaimant(ctx, ctx.params.uid) ? ctx.response.body = await showId(ctx.params.uid) : false;
    });

export default show;
import { Router } from "jsr:@oak/oak/router";
import { showAll, showId } from "../db/roots/show.js";

const show = new Router()
    .get("/all", async ctx=>{
        ctx.response.body = await showAll();
    })
    .get("/:uid", async ctx=>{
        ctx.response.body = await showId(ctx.params.uid);
    });

export default show;
import { Router } from "jsr:@oak/oak/router";
import { _addUser } from "../db/roots/add.js";

const add = new Router()
    .post("/", async ctx=>{
        ctx.response.body = await _addUser(await ctx.request.body.json()).then(re => re).catch(e => e.errorResponse.errmsg);
    });

export default add;
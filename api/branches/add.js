import { Router } from "jsr:@oak/oak/router";
import { _addUser } from "../db/roots/add.js";

const add = new Router()
    .post("/", async ctx=>{
        ctx.response.body = await _addUser(ctx.request.body).then(re=>re);
    });

export default add;
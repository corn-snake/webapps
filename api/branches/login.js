import { Router } from "jsr:@oak/oak/router";
import { _login } from "../db/roots/auth.js";
import crypto from "node:crypto";

const login = new Router()
    .post("/", async ctx=>{
        const {nombre, pwdHash} = await ctx.request.body.json();
        ctx.response.body = await _login(await nombre, await pwdHash).then(r=>ctx.cookies.set("auth", r)).catch(e=>console.log(e));
    })
    .post("/raw", async ctx=>{
        const {nombre, pwdHash} = await ctx.request.body.json();
        ctx.response.body = await _login(await nombre, crypto.hash("sha512", await pwdHash)).then(r=>ctx.cookies.set("auth", r)).then(()=>"acceso correcto").catch(e=>console.log(e));
    });

export default login;
import { Router } from "@oak/oak/router";
import { hasToken, _logout } from "../db/roots/auth.js";

const logout = new Router()
    .get("/", async ctx=>ctx.response.body =
        hasToken(ctx) ?
            await _logout(ctx).then(r=>ctx.cookies.clear()).then(()=>"Sesión cerrada correctamente").catch(e=>"ocurrió un error")
        : false
    );

export default logout;
import { User } from "../conn.js";

import crypto from "node:crypto";
import { encode, verify } from "jsr:@hig/jwt";

const secret = Deno.env.get("JWTKEY");
const masUnDia =()=> Math.floor(Date.now() / 1000) + 26 * 60 * 60,
    decodeJWt=(tkn)=>{
        try {
            var base64Url = tkn.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
            // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
        } catch (e) {
            return false;
        }
    };
const hasToken = async(ctx)=>await ctx.cookies.get("auth") || false;

const _login = (nombre, pwd) => User.findOne({nombre})
    .then(u=>crypto.scryptSync(pwd, u.salt, 64, "sha512").toString("hex") == u.pwd ? u.nombre : (()=>{throw new Error("contraseña incorrecta")})())
    .then(r=>{
        User.findOneAndUpdate({nombre: r}, {logged: true}).exec();
        return encode({nombre:r, exp: masUnDia()}, secret);
    }),
_logout = async(ctx) => User.findOneAndUpdate({nombre: decodeJWt(await ctx.cookies.get("auth")).nombre}, {logged: false});

const verifyAdmin = async (jwt) => (await verify(await jwt,secret)) == "valid" ? await User.findOne({nombre: decodeJWt(jwt).nombre}).then(u=>u.status == "admin") : false,
    adminIsLoggedIn = async(ctx) => await hasToken(ctx) && await verifyAdmin(await ctx.cookies.get("auth")),
    verifyClaimant = async(ctx, uid)=> await hasToken(ctx) && await User.findById(uid).then(async u=>u.nombre == decodeJWt(await ctx.cookies.get("auth")).nombre);

export {hasToken, _login, _logout, adminIsLoggedIn, verifyClaimant}
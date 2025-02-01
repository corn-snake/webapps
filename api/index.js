import { Application } from "jsr:@oak/oak/application";
import r from "./branches/routes.js";

const app = new Application();
app.addEventListener("listen", ({hostname, port})=>console.log(`Listening @ ${hostname ?? "localhost"}:${port}!`));

app.use(r.routes()).listen({ port: 3000 })
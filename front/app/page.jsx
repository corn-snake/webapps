import axios from "axios";
import Link from "next/link";
import UserData from "/components/UserData";
import { headers } from "next/headers";

const Page = async()=>{
    const h = await headers();
    const loggedIn = await axios.get(`http://localhost:80/api/login/check`, { headers: { "cookie": h.get("cookie") } })
        .then(d =>d.data);
    return <div>
        <h2>Está u.d. en el Sistema de Administración Shopfront, módulo de Cuentas de Usuario</h2>
        <span>{await loggedIn ? <UserData d={await loggedIn} /> : <span>No ha <Link href="/login">iniciado sesión</Link>, por lo que solo podrá ver la lista de productos.</span>}</span>
    </div>
}
export default Page;
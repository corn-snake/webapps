import axios from "axios";
import { headers } from "next/headers";
import NoDice from "/components/NoDice";
import Search from "/components/Search";

const Products = async({params}) =>{
    const h = await headers(),
        p = await (await params),
        adm = await axios.get("http://localhost:80/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d => d.data);
    if (!adm) return <NoDice/>
    const data = await (await axios.get(`http://localhost:80/api/all`, { headers: { "cookie": h.get("cookie") } }).then(d => d.data));
    return <>
    <h1>Todos los usuarios:</h1>
    <Search type="user" data={await data} adm={adm} lookFor={["nombre", "_id", "descripcion", "status"]} />
</>;}
export default Products;
import axios from "axios";
import AllTransactions from "/components/AllTransactions";
import { headers } from "next/headers";
import NoDice from "/components/NoDice";
import Search from "/components/Search";
import { dictionary, labels, order } from "/res/dictionaries";

const Products = async({params}) =>{
    const h = await headers(),
        p = await (await params),
        adm = await axios.get("http://localhost:8080/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d => d.data);
    if (p.type != "products" && !adm) return <NoDice/>
    if(p.type =="transactions") return <AllTransactions />
    const data = await (await axios.get(`http://localhost:8080/api/all/${p.type}`).then(d => d.data));
    return <>
    <h1>Todos los {dictionary[p.type]}:</h1>
    <Search type={p.type} data={data} adm={adm} lookFor={p.type == "users" ? ["uname", "name"] : "name"} />
</>;}
export default Products;
import axios from "axios";
import ModDelButtons from "/components/ModDelButtons";
import AddButton from "/components/AddButton";
import AllTransactions from "/components/AllTransactions";
import { headers } from "next/headers";
import NoDice from "/components/NoDice";
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
    <table>
        <thead><tr><th>ID</th>{order[p.type].map(k=><th key={`label_${k}`}>{labels[p.type][k]}</th>)}</tr></thead>
        <tbody>
            {data.map(async (e)=>
                <tr key={e.id}><td>{e.id}</td>
                    {order[p.type].map(k=><td key={k}>{labels.prefix[p.type][k] || ""}{e[k]}</td>)}
                    {(await adm) ? <ModDelButtons type={p.type.substring(0, p.type.length - 1)} itid={e.id} /> : ""}
                </tr>)}
                {(await adm) ? <tr><td><AddButton type={p.type.substring(0,p.type.length - 1)} /></td></tr> : ""}
        </tbody>
    </table>
</>;}
export default Products;
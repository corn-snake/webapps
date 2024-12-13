import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import { labels, modOrder, autocompletable, hide } from "/res/dictionaries";
import Autocomplete from "/components/Autocomplete"
import ClientHideHack from "/components/ClientHideHack";

const ModReceipt = async({params})=>{
    const h = await headers(),
        adm = await axios.get("http://localhost:8080/api/login/checkAdmin", {headers: {"cookie":h.get("cookie")}}).then(d=>true);
    if(!adm) return <NoDice/>
    const p = await (await params),
        data = (await axios.get(`http://localhost:8080/api/read/receipt/${p.id}/${p.idProducto}`)).data;
    return <div className="modifier">
        {modOrder.receipt.map(i=><span key={i}>{
            autocompletable.transaction.includes(i) ? <Autocomplete type="transaction" lookFor={i} nameAs={i} />
            : hide.items.transaction.includes(i) ? <ClientHideHack i={i} dat={new Date(data[i].seconds)} type="transaction" />
                : <><label htmlFor={i}>{labels.receipt[i]}</label><input type="text" placeholder={data[i]} /></>
        }</span>)}
    </div>
};
export default ModReceipt;
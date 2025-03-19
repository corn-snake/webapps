import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import { labels, modOrder, autocompletable, hide, sources, dont } from "/res/dictionaries";
import Autocomplete from "/components/Autocomplete"
import ClientHideHack from "/components/ClientHideHack";
import SubmitPut from "/components/SubmitPut";

const ModReceipt = async({params})=>{
    const h = await headers(),
        adm = await axios.get("http://localhost:8080/api/login/checkAdmin", {headers: {"cookie":h.get("cookie")}}).then(d=>true);
    if(!adm) return <NoDice/>
    const p = await (await params),
        data = (await axios.get(`http://localhost:8080/api/read/receipt/${p.id}/${p.idProducto}`)).data,
        fd = new Date(data.date.seconds * 1000);
    return <div className="modifier">
        {modOrder.receipt.map(i=><span key={i}>{
            autocompletable.transaction.includes(i) ? <Autocomplete type="transaction" inDB={sources.transaction[i]} lookFor={autocompletable.lookFor.transaction[i]} nameAs={i} />
            : hide.items.transaction.includes(i) ? <ClientHideHack i={i} dat={`${fd.getFullYear()}-${fd.getMonth()}-${fd.getDate()}`} type="transaction" />
                : !dont.transaction.includes(i) ? <><label htmlFor={i}>{labels.receipt[i]}</label><input type="text" placeholder={data[i]} id={i} /></> : ""
        }</span>)}
        <SubmitPut uri={`http://localhost:8080/api/mod/receipt`} fixed={{id: p.id, idProducto: p.idProducto}} />
    </div>
};
export default ModReceipt;
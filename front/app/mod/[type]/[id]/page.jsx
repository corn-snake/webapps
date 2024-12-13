import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import UpdateButton from "/components/UpdateButton";
import { dictionary, labels, modOrder, modLabels } from "/res/dictionaries";

const Modify = async ({params}) =>{
    const h = await headers(),
        p = await (await params),
        adm = await axios.get("http://localhost:8080/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d => d.data);
    if (!(await adm)) return <NoDice/>
    const data = await (await axios.get(`http://localhost:8080/api/read/${p.type}/id/${p.id}`).then(d => d.data));
    return <div className="modifier">
        {modOrder[p.type].map(it => <span key={it}><label htmlFor={it}>{labels[p.type + "s"][it] || modLabels[p.type][it]}</label><input type="text" name={it} id={it} placeholder={it !== "pwd" ? data[it] : ""} /></span>)}
        <UpdateButton itid={p.id} type={p.type}/>
    </div>;
}
export default Modify;
import axios from "axios";
import NoDice from "/components/NoDice";
import { headers } from "next/headers";
import { schema, userSchema } from "/res/dictionaries";
import Modifier from "/components/Modifier.jsx";

const Modify = async ({params}) =>{
    const h = await headers(),
        p = await (await params),
        data = await (await axios.get(`http://localhost/api/read/user/name/${p.id}`, { headers: { "cookie": h.get("cookie") } }).then(d => d.data));
    if (!(await data)) return <NoDice/>;
    /*const reduceToObject = (arr, value, curr="") => arr.length > 0 ? reduceToObject(arr.slice(1), value, curr + `['${arr[0]}']`) : ()=>eval(`changes${curr} = ${value}`);
    const tooLargeMapField = (sch, d, within=[]) => {
        "use client";
        if (Array.isArray(d) && sch.children !== undefined) return <ul key={sch.id}>{d.map((e, i) => <li key={`${sch.id}_${i}`}><label>{i}</label>{mapField(sch, e, [...within, sch.id, i])}</li>)}</ul>
        if (sch.children !== undefined) return <ul>{sch.children.map(e=><li key={e.id}><label htmlFor={e.id}>{e.alias ?? e.id}</label>{mapField(e,d[e.id], [...within, sch.id, e.id])}</li>)}</ul>;
        return sch.restrict !== undefined ? <select>{sch.restrict.map(e => <option key={`${sch.id}_o_${e}`} value={e} onChange={(e) => within.length > 0 ? reduceToObject(within, e.target.value, "") : () => changes[sch.id] = e.target.value}>{e}</option>)}</select> : <input type="text" name={sch.id} id={sch.id} placeholder={sch.id !== "pwd" ? d : ""} onInput={(e) => within.length > 0 ? reduceToObject(within, e.target.value, "") : () => changes[sch.id] = e.target.value} />;
    };*/
    return <Modifier data={await data} p={p} schema={(await axios.get("http://localhost/api/login/checkAdmin", { headers: { "cookie": h.get("cookie") } }).then(d=>d.data)) ? schema : userSchema} />;
}
export default Modify;
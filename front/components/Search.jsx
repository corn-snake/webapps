"use client";
import { schema } from "/res/dictionaries";
import AddButton from "/components/AddButton";
import ModDelButtons from "/components/ModDelButtons";
import { useState } from "react";

function removeNonAlphanumericAndDiacritics(str) {
    return str.normalize("NFD").replace(/[^0-9a-z]/gi, '');
} // https://stackoverflow.com/questions/39938539/javascript-filter-similar-strings
const excheque = (thing, simile)=>{
    const looker = removeNonAlphanumericAndDiacritics(thing).toUpperCase(),
        full = removeNonAlphanumericAndDiacritics(simile).toUpperCase();
    return full.indexOf(looker) >= 0;
}

const Search = ({type, lookFor, adm, data})=>{

    const headerFix = (item) => item.children !== undefined ? <><br/><table><thead><tr>{item.children.map(i=><th key={i.id}>{i.id}</th>)}</tr></thead></table></> : "";
    const [fil, chFil] = useState(data);

    const TbodyRenderHack = ({adm, type, data})=>{
        const renderNest = (item, dat) => {
            if (Array.isArray(dat)) return <td key={item.id}><table><tbody>{dat.map((d,i)=><tr key={i}>{renderNest(item, d)}</tr>)}</tbody></table></td>;
            if (item.children !== undefined) return <td key={item.id}><table><tbody><tr>{item.children.map(i=>renderNest(i,dat[i.id]))}</tr></tbody></table></td>;
            return <td key={item.id}><span>{dat}</span></td>;
        };
        return <>
            {data.map((e) =>{
                return <tr key={e._id}>
                    {schema.map(k =>renderNest(k,e[k.id] ?? "<missing>"))}
                    {adm ? <ModDelButtons type={type} itid={e.nombre} /> : ""}
                </tr>})}
            {adm ? <AddButton type={type} /> : ""}
        </>
    }

    return <div className="searchArea">
        <input type="text" name="search" id="search" onInput={e => chFil(() => data.filter(el => Array.isArray(lookFor) ? lookFor.reduce((pv, elem) => excheque(e.target.value, el[elem]) ? pv || true : pv, false) : excheque(e.target.value, el[lookFor])))} />
        <table>
            <thead><tr>{schema.map(k => <th key={`label_${k.id}`}>{k.alias ?? k.id}{headerFix(k)}</th>)}</tr></thead>
            <tbody>
                <TbodyRenderHack adm={adm} data={fil} type={type} />
            </tbody>
        </table>
    </div>
};

module.exports = Search;
import { dictionary, labels, order } from "/res/dictionaries";
import ModDelButtons from "/components/ModDelButtons";
import AddButton from "/components/AddButton";
const TbodyRenderHack = ({adm, type, data})=>{
    return <>
        {data.map((e) =>
            <tr key={e.id}><td>{e.id}</td>
                {order[type].map(k => <td key={k}>{labels.prefix[type][k] || ""}{e[k]}</td>)}
                {adm ? <ModDelButtons type={type.substring(0, type.length - 1)} itid={e.id} /> : ""}
            </tr>)}
        {adm ? <tr><td><AddButton type={type.substring(0, type.length - 1)} /></td></tr> : ""}
    </>
}
module.exports = TbodyRenderHack;
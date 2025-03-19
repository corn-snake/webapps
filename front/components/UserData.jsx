const { default: ModDelButtons } = require("./ModDelButtons");
const { schema } = require("/res/dictionaries");

const UserData = (d)=> {
    const data = d.d;
    const arrayRenderlet = (da, sch, last)=>sch.children !== undefined ? <ul>{sch.children.map(c=>renderItem(c,da[c.id]))}</ul> : <span key={da}>{da}{last ? "" : ", "}</span>,
        renderItem = (it,da) => {
            if (Array.isArray(da)) return <li key={it.id}><b>{it.alias ?? it.id}</b>:&nbsp;<span key={it.id}>{da.map((j,i)=>arrayRenderlet(j, it, i + 1 == da.length))}</span></li>;
            if (it.children !== undefined) return;
            return <li key={it.id}><span><b>{it.alias ?? it.id}</b>:&nbsp;{da}</span><br/></li>;
        };
    return <div><ul>
        {schema.map(i=>renderItem(i,data[i.id]))}
    </ul>
        <ModDelButtons type="user" itid={d.d.nombre} />
    </div>;
}

module.exports = UserData;

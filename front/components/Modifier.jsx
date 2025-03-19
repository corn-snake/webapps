"use client";

import UpdateButton from "/components/UpdateButton";

const Modifier = ({p, data, schema}) => {
    const changes = {};

    const MapField = (sch, d) => {
        return sch.restrict !== undefined ?
            <select defaultValue={d} onChange={e => changes[sch.id] = e.target.value}>{sch.restrict.map(e => <option key={`${sch.id}_o_${e}`} value={e}>{e}</option>)}</select>
            : <input type="text" name={sch.id} id={sch.id} placeholder={sch.id !== "pwd" ? sch.children !== undefined ? JSON.stringify(d) : d : ""} onInput={e => changes[sch.id] = e.target.value} />;
    }

    return <div className="modifier">
        {schema.map(it => <span key={it.id}><label htmlFor={it.id}>{it.alias ?? it.id}</label>{MapField(it, data[it.id])}</span>)}
        <UpdateButton itid={data.nombre} type={p.type} d={changes} db={true} />
    </div>
};

export default Modifier;
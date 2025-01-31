"use client";
import { useRouter } from "next/navigation";
import UpdateButton from "./UpdateButton";

const ModDelButtons = ({itid, type, notd}) =>{
    const r=useRouter(),
        mb = <button onClick={() => r.push(`/mod/${type}/${itid}`)}>Modificar</button>,
        db = <UpdateButton del={true} itid={itid} type={type} db={true} />;
    if(notd) return <>{mb}{db}</>
    return <>
        <td>{mb}</td>
        <td>{db}</td>
    </>;
};
export default ModDelButtons;
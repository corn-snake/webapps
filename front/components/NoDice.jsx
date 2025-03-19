"use client";
const {useRouter} = require("next/navigation");
const NoDice = () =>{
    const r = useRouter();
    return <div className="midhor_children">
        <h1>Oops.</h1>
        <h3>Parece que no tienes permiso de ingresar aquí.</h3>
        <span>Si quieres, puedes <button className="bare" onClick={()=>r.back()}>regresar a la página anterior</button>.</span>
    </div>;
}
export default NoDice;
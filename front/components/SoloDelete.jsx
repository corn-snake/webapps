"use client";
const { useRouter } = require("next/navigation");
const { default: UpdateButton } = require("./UpdateButton");

const SoloDelete = ({itid, type})=>{
    const r = useRouter();
    return <UpdateButton del={true} type={type} itid={itid} db={true} />
};

export default SoloDelete;
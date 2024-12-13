"use client";
import { useRouter } from "next/navigation";

const AddButton = ({ type }) => {
    const rut = useRouter();
    return <button onClick={() => rut.push(`/add/${type}`)}>+ A&ntilde;adir</button>;
};
export default AddButton;
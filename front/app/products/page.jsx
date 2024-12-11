import axios from "axios";
import ModDelButtons from "/components/ModDelButtons";
import AddButton from "/components/AddButton";

const Products = async() =>{
    return <>
    <h1>Todos los productos:</h1>
    <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Precio ($MXN)</th></tr></thead>
        <tbody>
            {await axios.get("http://localhost:8080/api/all/products").then(d=>d.data.map(async e=>
                <tr key={e.id}><td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>${e.price}</td>
                    <ModDelButtons type="prod" itid={e.id} />
                </tr>))}
            <AddButton type="prod" />
        </tbody>
    </table>
</>;}
export default Products;
import AddButton from "./AddButton";
import ModDelButtons from "./ModDelButtons";
import ReviveButton from "./ReviveButton";
import SoloDelete from "./SoloDelete";
import UpdateButton from "./UpdateButton";
import { productNumber, userNumber } from "/res/dictionaries";

const { default: axios } = require("axios");

const AllTransactions = async() =>{
    const data = await (await axios.get("http://localhost:8080/api/all/transactions").then(d => d.data)),
        usrs = await userNumber(),
        prods = await productNumber();
    return <><h1>Compras completadas:</h1>
        <ul>
            {Object.keys(data).map(i => <li key={i}>
                {parseInt(i) + 1}a compra, por el usuario {usrs[data[i][0].idUsuario]}<br />
                <i>Hecha el {(new Date(data[i][0].date.seconds * 1000)).toLocaleDateString("es-MX")}</i><br />
                Incluye:
                <ul>{data[i].map(pr => <li key={pr.idProducto} className={[pr.status == "cancelado" ? "dim" : ""]}>
                    {pr.amount} de {prods[pr.idProducto]}
                    &nbsp;&mdash;&nbsp;
                    <ModDelButtons notd type="receipt" itid={`${i}/${pr.idProducto}`} />
                    {pr.status == "cancelado" ? <ReviveButton itid={i} prod={pr.idProducto} /> : ""}
                    </li>)}
                    <li><AddButton type={`receipt/${i}`} /><SoloDelete type={`receipt`} itid={`${i}/all`}/></li>
                </ul>
            </li>)}
            <li><AddButton type={`transaction`} /></li>
        </ul>
    </>;
};
export default AllTransactions;
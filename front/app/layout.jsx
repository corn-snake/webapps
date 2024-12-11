import "./styles.css"
import Topbar from "/components/Topbar";
import Sidebar from "/components/Sidebar";

const RootLayout = ({children}) =>{
    //const [ctx, setCtx] = useContext();
    return <html lang="es">
        <head>
            <title>Shopfront</title>
        </head>
        <body>
            <Topbar/>
            <Sidebar/>
            <main>{children}</main>
        </body>
    </html>
}
export default RootLayout;

import Add from "./Add";
import FacturasProvider from "./FacturasProvider";
import Main from "./Main";

function Facturas() {


    return (<FacturasProvider>
        <Add />
        <Main />
    </FacturasProvider>);
}

export default Facturas;
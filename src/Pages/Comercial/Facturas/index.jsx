
import Add from "./Add";
import PreImpreso from "./Add/Print/PreImpreso";
import FacturasProvider from "./FacturasProvider";
import Main from "./Main";

function Facturas() {


    return (<FacturasProvider>
        
        <Add />
        <Main />
    </FacturasProvider>);
}

export default Facturas;
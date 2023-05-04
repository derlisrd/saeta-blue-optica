import DialogBuscarCliente from "./DialogBuscarCliente";
import DialogNroFactura from "./DialogNroFactura";
import FacturasProvider from "./FacturasProvider";
import Main from "./Main";
import PreImpreso from "./Print/PreImpreso";


function AddFactura() {

    

    return ( <FacturasProvider>
        <PreImpreso />
        <DialogNroFactura />
        <DialogBuscarCliente />
        <Main />
    </FacturasProvider>);
}

export default AddFactura;
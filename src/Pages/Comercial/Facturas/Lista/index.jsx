import EditarPago from "./EditarPago";
import Lista from "./Lista";
import ListaFacturaProvider from "./ListaFacturaProvider";
import Print from "./Print";
import Reportes from "./Reportes/Reportes";

function ListaFacturas() {
    return ( <ListaFacturaProvider>
        <Reportes />
        <Print />
        <EditarPago />
        <Lista />
    </ListaFacturaProvider> );
}

export default ListaFacturas;
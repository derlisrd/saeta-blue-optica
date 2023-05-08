import Lista from "./Lista";
import ListaFacturaProvider from "./ListaFacturaProvider";
import Print from "./Print";

function ListaFacturas() {
    return ( <ListaFacturaProvider>
        <Print />
        <Lista />
    </ListaFacturaProvider> );
}

export default ListaFacturas;
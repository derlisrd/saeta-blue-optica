import Lista from "./Lista";
import ListaFacturaProvider from "./ListaFacturaProvider";

function ListaFacturas() {
    return ( <ListaFacturaProvider>
        <Lista />
    </ListaFacturaProvider> );
}

export default ListaFacturas;
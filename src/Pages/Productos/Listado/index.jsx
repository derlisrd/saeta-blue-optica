import Lista from "./Lista";
import ListadoProductoProvider from "./ListadoProductoProvider";

function ListadoProducto() {
    return ( <ListadoProductoProvider>
        <Lista />
    </ListadoProductoProvider> );
}

export default ListadoProducto;
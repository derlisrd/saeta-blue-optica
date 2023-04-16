import DialogStock from "./DialogStock";
import Lista from "./Lista";
import ListadoProductoProvider from "./ListadoProductoProvider";

function ListadoProducto() {
    return ( <ListadoProductoProvider>
        <DialogStock />
        <Lista />
    </ListadoProductoProvider> );
}

export default ListadoProducto;
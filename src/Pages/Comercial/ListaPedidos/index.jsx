import CambioEstado from "./CambioEstado";
import Cancelar from "./Cancelar";
import DialogImprimir from "./DialogImprimir";


import Lista from "./Lista";
import ListaPedidosProvider from "./ListaPedidosProvider";

function ListaPedidos() {
    return (<ListaPedidosProvider>
        <Lista />
        <CambioEstado />
        <Cancelar />
        <DialogImprimir />
    </ListaPedidosProvider>);
}

export default ListaPedidos;
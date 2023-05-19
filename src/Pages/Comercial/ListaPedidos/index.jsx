import CambioEstado from "./CambioEstado";
import Cancelar from "./Cancelar";
import DialogImprimir from "./DialogImprimir";
import DialogPDF from "./DialogPDF";


import Lista from "./Lista";
import ListaPedidosProvider from "./ListaPedidosProvider";

function ListaPedidos() {
    return (<ListaPedidosProvider>
        <Lista />
        <DialogPDF />
        <CambioEstado />
        <Cancelar />
        <DialogImprimir />
    </ListaPedidosProvider>);
}

export default ListaPedidos;
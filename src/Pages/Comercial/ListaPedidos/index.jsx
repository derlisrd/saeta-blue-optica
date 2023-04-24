import Cancelar from "./Cancelar";
import DialogImprimir from "./DialogImprimir";
import EntregarPedido from "./EntregarPedido";
import Lista from "./Lista";
import ListaPedidosProvider from "./ListaPedidosProvider";

function ListaPedidos() {
    return (<ListaPedidosProvider>
        <Lista />
        <Cancelar />
        <EntregarPedido />
        <DialogImprimir />
    </ListaPedidosProvider>);
}

export default ListaPedidos;
import { Button } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function InputCliente() {
    const {factura} = usePedidos()


    return ( <Button>CLIENTE: {factura.cliente.ruc_cliente} {factura.cliente.nombre_cliente} </Button> );
}

export default InputCliente;
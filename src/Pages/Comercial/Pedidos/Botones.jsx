import { Button, Stack } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function Botones() {

    const {setearFactura,initialFactura,factura} = usePedidos()

    const cancelar = ()=>{
        setearFactura(initialFactura)
    }

    return ( <Stack spacing={2} >
        {
            factura.items.length>0 &&
            <>
            <Button size="large" variant="contained" color="success" fullWidth>
            FINALIZAR PEDIDO
        </Button>
        <Button onClick={cancelar} size="large" variant="outlined" color="info" fullWidth>
            CANCELAR PEDIDO
        </Button>
            </>
        }
    </Stack> );
}

export default Botones;
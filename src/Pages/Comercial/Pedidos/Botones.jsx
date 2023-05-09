import { Button, Stack } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";

function Botones() {
    const {navigate} = useGotoNavigate()
    const {setearFactura,initialFactura,factura,dialogs,setDialogs,idUpdate} = usePedidos()

    const cancelar = ()=>{
        setearFactura(initialFactura)
        if(idUpdate.state){
            navigate('/pedidos/lista')
        }
    }
    const receta = ()=> setDialogs({...dialogs,select_deposito_stock:true})

    const fin = ()=> setDialogs({...dialogs,finalizar:true})

    return ( <Stack spacing={2} >
        {
            factura.items.length>0 &&
            <>
            <Button size="large" onClick={fin} variant="contained" color="success" fullWidth>
            FINALIZAR PEDIDO
        </Button>
        <Button onClick={cancelar} size="large" variant="outlined" color="info" fullWidth>
            CANCELAR PEDIDO
        </Button>
        <Button onClick={receta} size="large" variant="outlined" color="warning" fullWidth>
            RECETA
        </Button>
            </>
        }
    </Stack> );
}

export default Botones;
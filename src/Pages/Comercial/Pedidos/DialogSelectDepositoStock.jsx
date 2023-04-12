import { Dialog, DialogTitle,DialogContent } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function DialogSelectDepositoStock() {

    const {setDialogs,dialogs,formDepositoStock} = usePedidos()

    console.log(formDepositoStock);

    const close = ()=>{ setDialogs({...dialogs,select_deposito_stock:false}) }

    return ( <Dialog open={dialogs.select_deposito_stock} fullWidth onClose={close} >
        <DialogTitle>Seleccionar item</DialogTitle>
        <DialogContent>
            
        </DialogContent>
    </Dialog> );
}

export default DialogSelectDepositoStock;
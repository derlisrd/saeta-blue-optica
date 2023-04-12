import { Dialog, DialogContent } from "@mui/material";

function DialogBuscarCliente() {

    const {setDialogs,dialogs} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,buscar_cliente:false}) }

    return ( <Dialog open={dialogs.buscar_cliente} fullWidth >
        <DialogContent>
            
        </DialogContent>
    </Dialog> );
}

export default DialogBuscarCliente;
import { Button, DialogActions, DialogContent } from "@mui/material";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import { useListadoProducto } from "./ListadoProductoProvider";

function DialogStock() {

    const {dialogs,llaveDialog} = useListadoProducto()

    const close = ()=> llaveDialog('stock',false)

    return (<DialogZoom fullWidth open={dialogs.stock} onClose={close} title='Stock' >
        <DialogContent>
            
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
        </DialogActions>
    </DialogZoom> );
}

export default DialogStock;
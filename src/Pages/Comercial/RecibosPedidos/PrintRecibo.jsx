import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from "@mui/material";
import { useReciboPedido } from "./Provider";
import { useState } from "react";

function PrintRecibo() {
    const {dialogs,setDialogs} = useReciboPedido()
    const [loading,setLoading] = useState(true)

    const close = ()=>{ setDialogs({...dialogs,print:false})}

    return (<Dialog fullScreen open={dialogs.print} onClose={close}>
        <DialogTitle>
            Imprimir Recibo de pedidos
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
            <Button startIcon={<Icon>print</Icon>} variant="contained">IMPRIMIR</Button>
            <Button onClick={close} variant="outlined">CERRAR</Button>
        </DialogActions>
    </Dialog>  );
}

export default PrintRecibo;
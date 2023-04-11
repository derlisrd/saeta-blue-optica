import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import TablaItems from "./TablaItems";
import InputCodigo from "./InputCodigo";


function DialogMain() {

    const {setDialogs,dialogs,factura} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    return ( <Dialog open={dialogs.main} fullScreen >

        <DialogTitle> Pedido - Total: {factura.total} </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                    <TablaItems items={factura.items} />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <InputCodigo />
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog> );
}

export default DialogMain;
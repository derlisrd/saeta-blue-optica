import { Dialog, DialogContent, Grid } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import TablaItems from "./TablaItems";


function DialogMain() {

    const {setDialogs,dialogs,factura} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    return ( <Dialog open={dialogs.main} fullScreen >
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={9}>
                    <TablaItems items={factura.items} />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>

                </Grid>
            </Grid>
        </DialogContent>
    </Dialog> );
}

export default DialogMain;
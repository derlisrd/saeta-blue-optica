import { Dialog, DialogContent, DialogTitle, Grid, IconButton } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import TablaItems from "./TablaItems";
import InputCodigo from "./InputCodigo";
import Botones from "./Botones";
import InputCliente from "./InputCliente";
import Cargando from "./Cargando";
import { funciones } from "../../../App/helpers/funciones";
import { Icon } from "@iconify/react";


function DialogMain() {

    const {setDialogs,dialogs,factura,cargas} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}} >
        <Cargando open={cargas.stock} />
        <DialogTitle> <IconButton onClick={close} ><Icon icon="ic:twotone-close" /> </IconButton>  Pedido - Total: { funciones.numberFormat( factura.total )} </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputCliente />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <TablaItems items={factura.items} />
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <Grid container rowGap={3}>
                        <Grid item xs={12}>
                            <InputCodigo />
                        </Grid>
                        <Grid item xs={12}>
                            <Botones />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DialogContent>
    </Dialog> );
}

export default DialogMain;
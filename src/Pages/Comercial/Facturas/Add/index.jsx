import { Dialog, DialogContent, Grid, IconButton } from "@mui/material";
import { useFacturas } from "../FacturasProvider";
import { Icon } from "@iconify/react";

function AddFactura() {

    const {dialogs,setDialogs} = useFacturas()
    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    return (<Dialog open={dialogs.main} fullScreen onClose={()=>{}} >
    <DialogTitle><IconButton onClick={close} ><Icon icon="ic:twotone-close" /> </IconButton>  Factura - Total: { funciones.numberFormat( factura.total )} </DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
               <Stack direction='row' spacing={2} alignItems='center'>
               <InputCliente />
                <Typography variant="overline">CODIGO CLIENTE: {factura.codigo_cliente_pedido}</Typography>
                <InputObs />
                <SelectTipo />
               </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
                <TablaItems items={factura.items} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <Grid container rowGap={3}>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </DialogContent>
</Dialog> );
}

export default AddFactura;
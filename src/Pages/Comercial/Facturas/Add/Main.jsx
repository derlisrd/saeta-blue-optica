import { Dialog, DialogContent, Grid, IconButton, DialogTitle,Stack,Button} from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import { Icon } from "@iconify/react";
import TableItems from "./TableItems";
import InputCodigo from "./InputCodigo";
import { funciones } from "../../../../App/helpers/funciones";
import Botones from "./Botones";
import SelectTipo from "./SelectTipo";


function Main() {
    const {dialogs,setDialogs,factura} = useFacturas()
    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    const openCliente = ()=>{ setDialogs({...dialogs,buscar_cliente:true})}
    const openNroFactura = ()=>{ setDialogs({...dialogs,nro_factura:true})}

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}} >
    <DialogTitle><IconButton onClick={close} ><Icon icon="ic:twotone-close" /> </IconButton>  Factura - Total: { funciones.numberFormat( factura.total)} </DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
               <Stack direction='row' spacing={2} alignItems='center'>
                    <Button onClick={openCliente}>CLIENTE: {factura.cliente.ruc_cliente} {factura.cliente.nombre_cliente}</Button>
                    <Button onClick={openNroFactura}>FACTURA NRO: {factura.nro_factura}</Button>
                    <SelectTipo />
               </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
                <TableItems />
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

export default Main;
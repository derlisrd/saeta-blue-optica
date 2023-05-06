import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,LinearProgress,TextField } from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import { APICALLER } from "../../../../Services/api";
import { useState } from "react";

function DialogInsertarPedido() {
    const {setDialogs,dialogs,setearFactura,factura,setPedidos,pedidos} = useFacturas()
    const [loading,setLoading] = useState(false)
    const close = ()=>{ 
        setDialogs({...dialogs,insertar_pedido:false});
    }
    
    const cambiar = async(e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const data = Object.fromEntries(myFormData.entries());
        setLoading(true)
        let res = await APICALLER.get({table:'pedidos_items',where:`pedido_id,=,${data.nro_pedido}`})
        console.log(res);
        setLoading(false)
        //setearFactura(f)
        //close();
    }


    return (
      <Dialog open={dialogs.insertar_pedido} fullWidth onClose={close}>
        <DialogTitle>NRO PEDIDO</DialogTitle>
        <form onSubmit={cambiar}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {
                loading && <LinearProgress />
              }
            </Grid>
            <Grid item xs={12}>
                <TextField required name="nro_pedido" fullWidth autoFocus />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" type="submit" >GUARDAR</Button>
            <Button variant="contained" onClick={close}>Cancelar</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
}

export default DialogInsertarPedido;
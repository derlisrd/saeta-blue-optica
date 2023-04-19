import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useEffect, useState } from "react";

function DialogObs() {

    const {dialogs,setDialogs,factura,setearFactura} = usePedidos()
    const [obs,setObs] = useState({
        cliente:'',
        laboratorio:'',
    })
    const close = ()=>{
        let new_fact = {...factura}
        new_fact.obs = obs
        setearFactura(new_fact)
        setDialogs({...dialogs,obs:false})
    }

    const change = e=>{
        const {value,name} = e.target
        setObs({...obs,[name]:value})
    }


    useEffect(()=>{
        setObs(factura.obs)
    },[factura])

    return (<Dialog open={dialogs.obs} onClose={close} fullWidth >
        <DialogTitle>Observaciones</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth name="laboratorio" autoFocus value={obs.laboratorio} onChange={change} label='Observaciones de laboratorio' />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="cliente"  value={obs.cliente} onChange={change} label='Observaciones de cliente' />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>  );
}

export default DialogObs;
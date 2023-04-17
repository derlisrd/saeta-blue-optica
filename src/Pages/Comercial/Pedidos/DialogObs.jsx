import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

function DialogObs() {

    const {dialogs,setDialogs} = usePedidos()
    const close = ()=>{
        setDialogs({...dialogs,obs:false})
    }

    return (<Dialog open={dialogs.obs} onClose={close} fullWidth >
        <DialogTitle>Observaciones</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label='Observaciones de laboratorio' />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label='Observaciones de cliente' />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>  );
}

export default DialogObs;
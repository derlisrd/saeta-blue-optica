import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useReciboPedido } from "./Provider";

function DialogAdd() {
    const {dialogs,setDialogs} = useReciboPedido()

    const close = ()=> setDialogs({...dialogs,add:false})
    
    return ( <Dialog open={dialogs.add} onClose={close} fullWidth>
        <DialogTitle>Agregar pedidos a recibo</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={8}>
                    <TextField fullWidth label="Nro de pedido" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" fullWidth>Agregar</Button>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained">CREAR</Button>
            <Button onClick={close} variant="outlined">CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogAdd;
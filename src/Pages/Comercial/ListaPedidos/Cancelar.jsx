import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";

function Cancelar() {

    const {dialogs,setDialogs} = useListaPedidos()
    
    const close = ()=>{
        setDialogs({...dialogs,cancelar: false})
    }

    return ( <Dialog open={dialogs.cancelar} fullWidth onClose={close}>
        <DialogTitle>Desea cancelar este pedido?</DialogTitle>
        <DialogContent>
            <Grid container>
                <TextField fullWidth label="Motivo de cancelamiento" autoFocus  />
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close} >Cerrar</Button>
            <Button variant="contained">Confirmar</Button>
        </DialogActions>
    </Dialog> );
}

export default Cancelar;
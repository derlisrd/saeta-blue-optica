import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { funciones } from "../../../App/helpers/funciones";
import { useAuth } from "../../../Providers/AuthProvider";
import { useRecibosProvider } from "./Provider";
import { useState } from "react";


function AddFecha() {
    const {dialogs,setDialogs,getLista} = useRecibosProvider()
    const [loading,setLoading]=useState(false)
    const [total,setTotal] = useState(0)
    const close = ()=> {
        setLoading(false);
        setDialogs({...dialogs,addfecha:false})
    }
    const finalizar = ()=>{

    }
    return ( <Dialog open={dialogs.addfecha} onClose={close} fullScreen >
    <DialogTitle>Agregar recibo nuevo | Total: {funciones.numberFormat(total)}</DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {loading && <LinearProgress />}
            </Grid>
        </Grid>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" onClick={finalizar}>FINALIZAR</Button>
        <Button variant="outlined" onClick={close}>CERRAR</Button>
    </DialogActions>
</Dialog> );
}

export default AddFecha;
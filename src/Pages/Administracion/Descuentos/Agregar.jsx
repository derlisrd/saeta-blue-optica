import { Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";

function Agregar() {
    const {dialogs,setDialogs} = useDescuentos()

    const close = ()=>{
        setDialogs({...dialogs,add:false})
    }

    return ( <Dialog onClose={close} open={dialogs.add} fullWidth >
        <DialogTitle></DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                      
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            
        </DialogActions>
    </Dialog> );
}

export default Agregar;
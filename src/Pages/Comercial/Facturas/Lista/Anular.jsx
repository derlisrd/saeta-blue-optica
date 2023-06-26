import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from "@mui/material";
import { useListaFactura } from "./ListaFacturaProvider";
import { useEffect,useState } from "react";
import { APICALLER } from "../../../../Services/api";
import { useAuth } from "../../../../Providers/AuthProvider";

function Anular() {
    const {dialogs,setDialogs,formSelect} = useListaFactura()
    const [loading,setLoading] = useState(false)
    const {userData} = useAuth()
    const {token_user} = userData
    const anular = async()=>{
        setLoading(true)
        let res = await APICALLER.update({table:'facturas',data:{estado_factura:0},id:formSelect.id_factura,token:token_user})
        if(!res.response){
            console.log(res);
        }
        setLoading(false)
        close()
    }
    const close = _ => setDialogs({...dialogs,anular:false})
    useEffect(()=>{
        console.log(formSelect);
    },[dialogs,formSelect])
    
    return (<Dialog fullWidth open={dialogs.anular} onClose={close}>
        <DialogTitle>Desea anular?</DialogTitle>
        <DialogContent>
            {loading && <LinearProgress />}
            <DialogContentText>
                {formSelect.nro_factura}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={anular}>Anular</Button>
            <Button variant="outlined" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>  );
}

export default Anular;
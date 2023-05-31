import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup } from "@mui/material";
import { useListaFactura } from "./ListaFacturaProvider";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../../Services/api";
import { useAuth } from "../../../../Providers/AuthProvider";

function EditarPago() {
    const {dialogs,setDialogs,formSelect,getLista} = useListaFactura()
    const {userData} = useAuth()
    const {token_user} = userData
    const [estado,setEstado] = useState ('0')
    const [loading,setLoading] = useState(false)
    const close = ()=> setDialogs({...dialogs,pago:false})
    const confirmar = async()=>{
        setLoading(true)
        let res = await APICALLER.update({table:'facturas',data:{factura_pagado:estado},id:formSelect.id_factura,token:token_user})
        if(!res.response){
            console.log(res);
        }
        setLoading(false)
        close()
        getLista()
    }
    useEffect(()=>{
        if(dialogs.pago){
            setEstado(formSelect.estado_factura)
        }
    },[dialogs,formSelect])
    return (<Dialog open={dialogs.pago} fullWidth onClose={close}>
        <DialogTitle>Cambiar estado de pago</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="estado_pago">Estado de pago</FormLabel>
                    <RadioGroup
                        row
                        value={estado}
                        onChange={e=>{ setEstado(e.target.value)} }
                        name="estado"
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Pendiente..." />
                        <FormControlLabel value="1" control={<Radio />} label="Pagado" />
                       </RadioGroup>
                </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={confirmar}>Confirmar</Button>
            <Button variant="outlined" onClick={close}>Cancelar</Button>
        </DialogActions>
    </Dialog>  );
}

export default EditarPago;
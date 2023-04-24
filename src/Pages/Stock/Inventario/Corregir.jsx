import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useInventario } from "./InventarioProvider";
import { useEffect, useState } from "react";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import { APICALLER } from "../../../Services/api";

function Corregir() {

    const {formSelect,setFormSelect,dialogs,setDialogs,token_user,stock,setStock} = useInventario()
    const [formEdit,setFormEdit] = useState({})
    const [loading,setLoading] = useState(false)
    const close = ()=>{
        setLoading(false)
        setDialogs({...dialogs,corregir:false})
        setFormSelect({})
    }
    //console.log(stock);
    const enviar = async()=>{
        
        if(formEdit.stock_producto_deposito === '') return false;
        if( parseFloat(formEdit.stock_producto_deposito)<0 ) return false;
        let f = {...formEdit}
        setLoading(true)
        if(formEdit.id_productos_deposito){
            let res = await APICALLER.update({table:'productos_depositos',data:{stock_producto_deposito: f.stock_producto_deposito},id:f.id_productos_deposito, token:token_user})
            if(!res.response){
                console.log(res);
            }
        }else{
            delete f.id_productos_deposito 
            let res = await APICALLER.insert({table:'productos_depositos',data:f,token:token_user})
            if(!res.response){
                console.log(res);
            }
        }
        let copy_stock = [ ...stock]
        let foundEsfe = copy_stock.find(e=> e.esferico === formEdit.graduacion_esferico)
        let indexEsfe = copy_stock.findIndex(e=> e.esferico === formEdit.graduacion_esferico)
        //let foundCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === formEdit.graduacion_cilindrico)
        let indexCili = foundEsfe.cilindrico.findIndex(e=> e.cilindrico === formEdit.graduacion_cilindrico)
        copy_stock[indexEsfe].cilindrico[indexCili].stock = f.stock_producto_deposito
        
        //setStock(copy_stock)
        setLoading(false)
        close() 

    }

    const change = e=>{
        setFormEdit({...formEdit,stock_producto_deposito: e.target.value})
    }
    //console.log(formEdit,stock);
    useEffect(()=>{
        setFormEdit(formSelect)
    },[formSelect])

    return ( <Dialog onClose={close} open={dialogs.corregir} fullWidth>
        <DialogTitle>Corregir</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField label="Esférico" value={formEdit?.graduacion_cilindrico} disabled />
                </Grid> 
                <Grid item xs={12} sm={3}>
                    <TextField label="Cilindrico" value={formEdit?.graduacion_cilindrico} disabled />
                </Grid> 
                <Grid item xs={12} sm={3}>
                    <TextField label="Stock" value={formEdit?.stock_producto_deposito} onChange={change} name='stock_producto_deposito' InputProps={{inputProps: { min: 0 },inputComponent: NumberFormatCustom}}  />
                </Grid> 
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cancelar</Button>
            <Button onClick={enviar} variant="contained">Corregir</Button>
        </DialogActions>
    </Dialog> );
}

export default Corregir;
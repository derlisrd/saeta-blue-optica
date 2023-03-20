import {Alert, DialogContent,Grid,LinearProgress,TextField} from "@mui/material";
import { useState } from "react";
import ActionsCancelSave from "../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import useQuerys from "../../../Hooks/useQuerys";
import { useClientes } from "../ClientesProvider";
import TipoPago from "./TipoPago";

function Add() {
    const { dialogs, llaveDialog,getLista} = useClientes();
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,message:'',code:0})
    const {insert,get} = useQuerys()    

    const close = () => {setError({active:false,code:0,message:''}); llaveDialog("add", false)}

    const focus = (id) =>  window.setTimeout(()=>{document.getElementById(id).focus()},500)

    const enviar = async(e)=>{ 
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        if(datas.ruc_cliente === ''){
            focus('ruc_cliente')
            return false;
        }
        if(datas.nombre_cliente === ''){
            return false;
        }
        setLoading(true)
        let check = await get({table:'clientes',where:`ruc_cliente,=,'${datas.ruc_cliente}'`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un cliente con ese doc.',code:1})
            setLoading(false)
            return false;
        }
        setError({active:false,message:'',code:0})

        let res = await insert({table:'clientes',data:datas})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }
  

  return (
    <DialogZoom open={dialogs.add} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="ruc_cliente" error={error.code===1} autoFocus name="ruc_cliente" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_cliente" required autoComplete="off" label="Nombre completo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_cliente" label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="email_cliente" label="Email" />
                </Grid>
                <Grid item xs={12}>
                    <TipoPago name="tipo_pago" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Add;

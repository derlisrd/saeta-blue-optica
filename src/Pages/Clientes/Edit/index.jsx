import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../Components/Dialogo/DialogZoom";
import useQuerys from "../../../Hooks/useQuerys";
import { useClientes } from "../ClientesProvider";


function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useClientes();
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,message:''})
    const {update,get} = useQuerys()    
    const [formEdit,setFormEdit] = useState({id_cliente:'',ruc_cliente:'',tipo_cliente:'',email_cliente:'',telefono_cliente:''})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => llaveDialog("edit", false)

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.ruc_cliente === ''){

            return false;
        }
        if(datas.nombre_cliente === ''){
            return false;
        }
        setLoading(true)
        let id = formSelect.id_cliente;
        let check = await get({table:'clientes',where:`ruc_cliente,=,'${datas.ruc_cliente}',and,id_cliente,<>,${id}`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un cliente con ese doc.'})
            setLoading(false)
            return false;
        }
        setError({active:false,message:''})
        let res = await update({table:'clientes',body:datas,id})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }

    useEffect(()=>{
        setFormEdit(formSelect)
        //console.log('cambia form select');
    },[formSelect])
  

  return (
    <DialogZoom open={dialogs.edit} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <input type="hidden" name="id" value={formSelect.id_cliente} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField autoFocus name="ruc_cliente" onChange={change} value={formEdit.ruc_cliente} required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_cliente" onChange={change} value={formEdit.nombre_cliente} required autoComplete="off" label="Nombre completo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_cliente" onChange={change} value={formEdit.telefono_cliente} label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="email_cliente" onChange={change} value={formEdit.email_cliente} label="Email" />
                </Grid>
                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;

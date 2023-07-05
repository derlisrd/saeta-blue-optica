import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from "@mui/material";
import { useReciboPedido } from "./Provider";
import { APICALLER } from "../../../Services/api";
import { useState } from "react";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import ListadoAgregado from "./ListadoAgregado";
import { useAuth } from "../../../Providers/AuthProvider";

function DialogAdd() {
    const {dialogs,setDialogs} = useReciboPedido()
    const {userData} = useAuth()
    const {token_user} = userData
    const [listado,setListado] = useState([])
    const [nro,setNro] = useState('') //nro de pedido
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,msg:''})
    
    const crear = async()=>{
        setLoading(true)
        let promesas = [];
        promesas.push(APICALLER.insert({table:'recibo_pedidos'}))
        listado.forEach(element => {
        });
        setLoading(false)
    }
    const consultar = async()=>{
        let doc = document.getElementById('_nropedido')
        //let nro = doc.value
        if(nro==='' || nro.length<1){
            return false;
        }
        setError({active:false,msg:""})
        setLoading(true)
        let res = await APICALLER.get({table:'pedidos',include:'clientes',on:'cliente_id_pedido,id_cliente',where:`id_pedido,=,'${nro}'`,fields:'id_pedido,fecha_pedido,total_pedido,nombre_cliente'})
        if(res.response){
            if(res.found>0){
                
                let previo = [...listado]
                previo.push(res.results[0])
                setListado(previo)
                setNro('')
                doc.focus()
            }else{
                setError({active:true,msg:"No existe pedido"})
            }
        }
        setLoading(false)
    }

    const close = ()=> setDialogs({...dialogs,add:false})
    
    return ( <Dialog open={dialogs.add} onClose={close} maxWidth="md" fullWidth>
        <DialogTitle>Agregar pedidos a recibo</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12}>{loading && <LinearProgress />}
                    {error.active && <Alert variant="outlined" icon={false} severity="error">{ error.msg}</Alert> }
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField name='nro' autoFocus value={nro} onChange={e=>setNro(e.target.value)} InputProps={{inputComponent: NumberFormatCustom}}  id="_nropedido" fullWidth label="Nro de pedido" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" size="large" onClick={consultar} fullWidth>Agregar</Button>
                </Grid>
                <Grid item xs={12}>
                    <ListadoAgregado pedidos={listado} eliminar={()=>{}} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button disabled={listado.length<1} onClick={crear} variant="contained">CREAR</Button>
            <Button onClick={close} variant="outlined">CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogAdd;
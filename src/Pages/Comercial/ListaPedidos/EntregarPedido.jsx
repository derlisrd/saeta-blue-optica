
import { useState } from "react";
import DialogPregunta from "../../../Components/Dialogo/DialogPregunta";
import { useListaPedidos } from "./ListaPedidosProvider";
import { Button,  Dialog, DialogContent, LinearProgress } from "@mui/material";
import { APICALLER } from "../../../Services/api";
import { useAuth } from "../../../Providers/AuthProvider";


function EntregarPedido() {
    const {userData} = useAuth()
    const {dialogs,setDialogs,formSelect,getLista} = useListaPedidos()
    const [loading,setLoading] = useState(false)
    const close = ()=>{ setDialogs({...dialogs,entregar:false})}

    const entregar = async()=>{
        setLoading(true)
        let res = await APICALLER.update({
            table:'pedidos',data:{entregado_pedido:'1'},
            id:formSelect.id_pedido,
            token:userData.token_user
        })
        if(!res.response){
            console.log(res);
        }
        getLista()
        close()
        setLoading(false)
    }


    if(loading){
        return <Dialog fullWidth open={dialogs.entregar}><DialogContent> <LinearProgress sx={{ my:5 }} /> </DialogContent></Dialog>
    }

    return (<DialogPregunta text='Desea entregar el pedido?' open={dialogs.entregar} onClose={close} title='Desea entregar pedido?' icon={{ name:'carbon:delivery-parcel',color:'orange' }} >
    <Button onClick={entregar} variant="contained">Entregar</Button>
    <Button onClick={close} variant="outlined">Cancelar</Button>
    </DialogPregunta>);
}

export default EntregarPedido;
import { Button,  Stack, TextField,IconButton } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useListaPedidos } from "./ListaPedidosProvider";
import { columns } from "./columns";
import { useState } from "react";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import { Icon } from "@iconify/react";

function Lista() {
    const {listas,loading,setFormSelect,dialogs,setDialogs,setFechas,getLista} = useListaPedidos()

    const [error,setError] = useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta] = useState('')

    const filtrar = ()=>{
        if(desde===''){
            setError({code:1})
            return false;
        }
        if(hasta===''){
            setError({code:2})
            return false
        }
        setError({code:0})
        setFechas({desde:`${desde} 00:00:00`,hasta:`${hasta} 23:59:59`})
    }

    const print = (r)=>{ setFormSelect(r); setDialogs({...dialogs,imprimir:true})}
    //const entregar = (r)=>{ setFormSelect(r); setDialogs({...dialogs,entregar:true})}
    const cancelar = (r)=> {setFormSelect(r); setDialogs({...dialogs,cancelar:true})}

    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            <ButtonTip onClick={()=>{cancelar(rowProps)}} icon='ic:twotone-cancel' title='Cancelar pedido' />
            <ButtonTip title='Imprimir pedido' onClick={()=>{print(rowProps)}} icon='ic:twotone-print' /> 
        </Stack>
    )


    const Inputs = (
        <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Ingrese el nro, presione Enter' label='Número de pedido' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ingrese el doc o nombre, presione Enter' label='Ruc o nombre de cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <IconButton onClick={getLista}><Icon icon='solar:refresh-circle-bold-duotone' /></IconButton>
        </Stack>
    )

    return (<Tablas
        title="Pedidos"
        subtitle="Módulo de listado de pedidos"
        inputs={Inputs}
        datas={listas.pedidos}
        loading={loading}
        icon={{ name:'ic:baseline-receipt-long' }}
        showOptions
        Accions={ListaOpciones}
        columns={columns}
         />  );
}

export default Lista;
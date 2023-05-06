import { Button,  Stack, TextField,IconButton, Grid, Alert } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useListaPedidos } from "./ListaPedidosProvider";
import { columns } from "./columns";
import { useState } from "react";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import { Icon } from "@iconify/react";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";
import swal from "sweetalert";
import { funciones } from "../../../App/helpers/funciones";

function Lista() {
    const {listas,loading,setFormSelect,dialogs,setDialogs,setFechas,getLista} = useListaPedidos()
    const {navigate} = useGotoNavigate()
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
    const cambioestado = (r)=>{ setFormSelect(r); setDialogs({...dialogs,cambio_estado:true})}
    const cancelar = (r)=> {setFormSelect(r); setDialogs({...dialogs,cancelar:true})}
    const navegar = ()=>{ navigate('/pedidos?open=nuevo') }
    const motivoCancela = (r)=>{
        swal({text:r.motivo_cancela, title:`Pedido ${r.id_pedido} - Motivo:`,icon:'info'})
    }

    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            {
                rowProps.estado_pedido!=='0' && 
                <>
                <ButtonTip onClick={()=>{cancelar(rowProps)}} icon='ic:twotone-cancel' title='Cancelar pedido' />
                <ButtonTip title='Cambio de estado' onClick={()=>{cambioestado(rowProps)}} icon='material-symbols:change-circle-outline' />
                </> 
            }
            <ButtonTip title='Imprimir pedido' onClick={()=>{print(rowProps)}} icon='ic:twotone-print' />
            {
            rowProps.estado_pedido==='0' && 
            <ButtonTip title='Motivo de cancelamiento' onClick={()=>{motivoCancela(rowProps)}} icon='ic:twotone-info' />
            } 
        </Stack>
    )


    const Inputs = (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Button onClick={navegar} variant="contained" size="large">Nuevo pedido</Button>
            </Grid>
            <Grid item xs={12}>
            <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Ingrese el nro, presione Enter' label='Número de pedido' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ingrese el doc o nombre, presione Enter' label='Ruc o nombre de cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <IconButton onClick={()=>{ getLista('','')}}><Icon icon='solar:refresh-circle-bold-duotone' /></IconButton>
            </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Alert icon={false}>Total: {listas.total}</Alert>
            </Grid>
            <Grid item xs={12} sm={4}>
            <Alert icon={false}>Entrada: {funciones.numberFormat(listas.entrada)}</Alert>
            </Grid>
        </Grid>
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
import { Button,  Stack, TextField, Grid, Alert } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useListaPedidos } from "./ListaPedidosProvider";
import { columns, columnsData } from "./columns";
import { useState } from "react";
import ButtonTip from "../../../Components/Botones/ButtonTip";
import useGotoNavigate from "../../../Hooks/useGotoNavigate";
import swal from "sweetalert";
import { funciones } from "../../../App/helpers/funciones";
import xlsx from "json-as-xlsx"

function Lista() {
    const {listas,loading,setFormSelect,dialogs,setDialogs,setFechas,getLista} = useListaPedidos()
    const {navigate} = useGotoNavigate()
    const [error,setError] = useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta] = useState('')
    const downloadExcel = () => {
        let data = [
          {
            sheet: "Pedidos",
            columns: columnsData,
            content: listas.pedidos,
          },
          
        ]
        let settings = {
          fileName: "Pedidos",
        }
        xlsx(data, settings)
      }

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
    const editPedido = r =>{navigate(`/pedidos?open=nuevo&id=${r.id_pedido}`)}
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
                <ButtonTip onClick={()=>{editPedido(rowProps)}} icon='edit' title='Editar pedido' />
                <ButtonTip onClick={()=>{cancelar(rowProps)}} icon='cancel' title='Cancelar pedido' />
                <ButtonTip title='Cambio de estado' onClick={()=>{cambioestado(rowProps)}} icon='display_settings' />
                </> 
            }
            <ButtonTip title='Imprimir pedido' onClick={()=>{print(rowProps)}} icon='print' />
            {
            rowProps.estado_pedido==='0' && 
            <ButtonTip title='Motivo de cancelamiento' onClick={()=>{motivoCancela(rowProps)}} icon='info' />
            } 
        </Stack>
    )


    const Inputs = (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12}>
                <Button onClick={navegar} variant="contained" size="large">Nuevo pedido</Button>
            </Grid>
            <Grid item xs={12}>
            <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value,'') }} helperText='Ingrese el nro, presione Enter' label='Número de pedido' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ingrese el doc o nombre, presione Enter' label='Ruc o nombre de cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <ButtonTip onClick={()=>{ getLista('','')}} title='Actualizar' icon='sync' />
            </Stack>
            </Grid>
            {listas.pedidos.length>0 && <Grid item xs={12} sm={3} md={2}>
                <Button variant="outlined" fullWidth onClick={downloadExcel} color='success'>EXCEL</Button>
            </Grid>}
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
        icon={{ name:'receipt' }}
        showOptions
        Accions={ListaOpciones}
        columns={columns}
         />  );
}

export default Lista;
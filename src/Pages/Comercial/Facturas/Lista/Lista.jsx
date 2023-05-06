import Tablas from "../../../../Components/Tablas";
import { Button,  Stack, TextField,IconButton, Grid, Alert } from "@mui/material";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { useListaFactura } from "./ListaFacturaProvider";
import { useState } from "react";
import ButtonTip from "../../../../Components/Botones/ButtonTip";
import { columns } from "./columns";
import { funciones } from "../../../../App/helpers/funciones";

function Lista() {
    const {listas,loading,setFechas,getLista} = useListaFactura()
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

    const navegar = ()=>{ navigate('/facturas/add') }

    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            <ButtonTip title='Ver' icon='ic:twotone-remove-red-eye' onClick={()=>{}} />
        </Stack>
    )

    //console.log(listas);

    const Inputs = (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button onClick={navegar} variant="contained" size="large">Nueva Factura</Button>
            </Grid>
            <Grid item xs={12}>
            <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Ingrese el nro, presione Enter' label='Número de factura' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ingrese el doc o nombre, presione Enter' label='Ruc o nombre de cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <ButtonTip title='Actualizar' onClick={()=>{getLista('','')}} icon='solar:refresh-circle-bold-duotone' />
            </Stack>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Alert icon={false}>Total: { funciones.numberFormat( listas.total)}</Alert>
            </Grid>
        </Grid>
    )


    return (<Tablas
        title="Factura"
        subtitle='Listado de facturas'
        inputs={Inputs}
        datas={listas.facturas}
        loading={loading}
        icon={{ name:'ic:baseline-receipt-long' }}
        showOptions
        Accions={ListaOpciones}
        columns={columns}
         />  );
}

export default Lista;
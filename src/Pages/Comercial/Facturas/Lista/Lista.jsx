import Tablas from "../../../../Components/Tablas";
import { Button,  Stack, TextField, Grid, Alert} from "@mui/material";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { useListaFactura } from "./ListaFacturaProvider";
import { useEffect, useState } from "react";
import ButtonTip from "../../../../Components/Botones/ButtonTip";
import { columns, columnsData } from "./columns";
import { funciones } from "../../../../App/helpers/funciones";
import SelectCondicion from "./SelectCondicion";
import xlsx from "json-as-xlsx"

function Lista() {
    const {listas,loading,setFechas,getLista} = useListaFactura()
    const [listaFiltrada,setListaFiltrada] = useState([])
    const [totalVenta,setTotalVenta] = useState(0)
    const {navigate} = useGotoNavigate()
    const [error,setError] = useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta] = useState('')

    const downloadExcel = () => {
        let data = [
          {
            sheet: "Facturas",
            columns: columnsData,
            content: listaFiltrada,
          },
          
        ]
        let settings = {
          fileName: "Facturas",
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

    const navegar = ()=>{ navigate('/facturas/add') }

    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            <ButtonTip title='Ver' icon='ic:twotone-remove-red-eye' onClick={()=>{}} />
        </Stack>
    )

    const filtarCondicion = (e)=>{
        let old_list = [...listas.facturas]
        
        const {value} = e.target
        if(value ==='0'){
            setListaFiltrada(listas.facturas)
            setTotalVenta(listas.total)
            return
        }
        let result =  old_list.filter(elem => elem.tipo_factura === value);
        let new_total = 0;
        result.forEach(element => {
            new_total += parseFloat(element.total_factura)
        });
        setTotalVenta(new_total)
        setListaFiltrada(result)
    }


    const Inputs = (
        <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
            <Grid item xs={12}>
                <Button onClick={navegar} variant="contained" size="large">Nueva Factura</Button>
            </Grid>
            <Grid item xs={12}>
            <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Número de factura' label='Número' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ruc o Nombre' label='Cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <SelectCondicion onChange={filtarCondicion}  />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <ButtonTip title='Actualizar' onClick={()=>{getLista('','')}} icon='solar:refresh-circle-bold-duotone' />
            </Stack>
            </Grid>
            {listaFiltrada.length>0 && <Grid item xs={12} sm={3} md={2}>
                <Button variant="outlined" fullWidth onClick={downloadExcel} color='success'>EXCEL</Button>
            </Grid>}
            <Grid item xs={12} sm={4} md={3}>
                <Alert icon={false}>Total: {funciones.numberFormat(totalVenta)} </Alert>
            </Grid>
        </Grid>
    )

    useEffect(()=>{
        setListaFiltrada(listas.facturas)
        setTotalVenta(listas.total)
    },[listas])

    return (<Tablas
        title="Factura"
        subtitle='Listado de facturas'
        inputs={Inputs}
        datas={listaFiltrada}
        loading={loading}
        icon={{ name:'receipt' }}
        showOptions
        Accions={ListaOpciones}
        columns={columns}
         />  );
}

export default Lista;
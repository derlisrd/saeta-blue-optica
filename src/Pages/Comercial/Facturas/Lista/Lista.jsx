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
import ButtonPermisos from "../../../../Components/Botones/ButtonPermisos";

function Lista() {
    const {listas,loading,setFechas,getLista,setFormSelect,dialogs,setDialogs} = useListaFactura()
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
    const openReportes = ()=> setDialogs({...dialogs,reportes:true});
    const navegar = ()=>{ navigate('/facturas/add') }
    const print = r=>{ setFormSelect(r); setDialogs({...dialogs,print:true}) }
    const estado = r=>{ setFormSelect(r); setDialogs({...dialogs,pago:true}) }
    const anular = r=> {setFormSelect(r); setDialogs({...dialogs,anular:true}) }
    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            {
                rowProps.estado_factura==='1' && <><ButtonTip id='18' title='Anular' icon='close' onClick={()=>{anular(rowProps)}} />
                <ButtonTip id='19' title='Estado de pago' icon='edit' onClick={()=>{estado(rowProps)}} /> </>
            }
            
            <ButtonTip id='22' title='Imprimir' icon='print' onClick={()=>{print(rowProps)}} />
        </Stack>
    )

    


    const Inputs = (
        <Grid container spacing={2} alignItems='center' justifyContent='flex-start'>
            <Grid item xs={12}>
                <ButtonPermisos id='17' onClick={navegar} variant="contained" size="large">Nueva Factura</ButtonPermisos>
            </Grid>
            <Grid item xs={12}>
            <Stack direction={{ xs:'column',md:'row' }} sx={{ maxWidth:{md:'1100px'} }} spacing={1} alignItems='flex-start'>
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista(e.target.value) }} helperText='Número de factura' label='Número' />
            <TextField size="small" fullWidth onKeyUp={e=>{ e.key==='Enter' && getLista('',e.target.value) }} helperText='Ruc o Nombre' label='Cliente' />
            <TextField type="date" fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <SelectCondicion onChange={filtarCondicion}  />
            <Button variant="outlined" size="large" onClick={filtrar}>Filtrar</Button>
            <ButtonTip id='16' onClick={()=>{ getLista('','')}} title='Actualizar' icon='sync' />
            </Stack>
            </Grid>
            {listaFiltrada.length>0 && <Grid item xs={12} sm={3} md={2}>
                <ButtonPermisos id='21' variant="outlined" onClick={openReportes} color='success'>Reportes</ButtonPermisos>
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
import { Button, IconButton, Stack, TextField } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useListaPedidos } from "./ListaPedidosProvider";
import { Icon } from "@iconify/react";
import { columns } from "./columns";
import { useState } from "react";

function Lista() {
    const {listas,loading,setFormSelect,dialogs,setDialogs,setFechas} = useListaPedidos()


    const [desde,setDesde] = useState('')
    const [hasta,setHasta] = useState('')

    const filtrar = ()=>{
        if(desde==='' || hasta === ''){
            return false;
        }
        setFechas({desde:`${desde} 00:00:00`,hasta:`${hasta} 23:59:59`})
    }

    const print = (r)=>{ setFormSelect(r); setDialogs({...dialogs,imprimir:true})}
    const entregar = (r)=>{ setFormSelect(r); setDialogs({...dialogs,entregar:true})}

    const ListaOpciones = ({rowProps})=>(
        <Stack direction='row'>
            <IconButton onClick={()=>{entregar(rowProps)}}><Icon icon='carbon:delivery-parcel' /> </IconButton>
            <IconButton onClick={()=>{print(rowProps)}}><Icon icon='ic:twotone-print' /> </IconButton>
        </Stack>
    )


    const Inputs = (
        <Stack direction='row' spacing={1} alignItems='center'>
            <TextField type="date" onChange={e=>{setDesde(e.target.value)}} helperText='desde' />
            <TextField type="date" onChange={e=>{setHasta(e.target.value)}} helperText='hasta' />
            <Button variant="outlined" onClick={filtrar}>Filtrar</Button>
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
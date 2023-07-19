import { Button, Stack } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import {columns} from './columns'
import { useRecibosProvider } from "./Provider";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function Lista() {
    const {dialogs,setDialogs,listas,loading,setFormSelect} = useRecibosProvider()
    const add = ()=>setDialogs({...dialogs,add:true})
    const inputs =(
        <Stack direction='row' spacing={2}>
            <Button onClick={add} variant="contained">AGREGAR</Button>
        </Stack>
    )

    const print = (f)=>{ setFormSelect(f); setDialogs({...dialogs,print:true}); console.log(f);}
    const Accions = ({rowProps})=>(
        <Stack direction='row' spacing={1}>
            <ButtonTip id='57' onClick={()=>{print(rowProps)}} icon='print' title="Imprimir" /> 
        </Stack>
    )
    return (<Tablas
        title="Recibos"
        subtitle="Modulo de recibos."
        icon={{ name:'receipt' }} 
        loading={loading}
        datas={listas}
        columns={columns}
        inputs={inputs}
        Accions={Accions}
        showOptions
    />);
}

export default Lista;
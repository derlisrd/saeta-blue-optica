import { Stack } from "@mui/material";
import Tablas from "../../../Components/Tablas";
import { useDescuentos } from "./DescuentosProvider";
import {columns} from './columns'
import ButtonTip from "../../../Components/Botones/ButtonTip";
import AddButton from "../../../Components/Botones/AddButton";

function ListaDescuentos() {
    
    const {listas,dialogs,setDialogs,loading} = useDescuentos()

    const add = ()=>{ setDialogs({...dialogs,add:true})}

    const Inputs = (<Stack direction='row'>
        <AddButton onClick={add} />
    </Stack>)


    const Opciones = ({rowProps})=>(
        <Stack direction='row'>
            <ButtonTip title='Ver' onClick={()=>{}} icon='edit' />
        </Stack>
    )


    return (<Tablas 
        title='Descuentos'
        subtitle='Descuentos por clientes'
        icon={{ name:'price_check' }}
        loading={loading}
        showOptions
        Accions={Opciones}
        datas={listas.descuentos}
        columns={columns}
        inputs={Inputs}
    />);
}

export default ListaDescuentos;
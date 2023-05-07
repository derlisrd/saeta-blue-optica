import {  Stack } from "@mui/material";
import { useClientes } from "./ClientesProvider";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useClientes()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row">
        <ButtonTip onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' />
    </Stack>
    )
}

export default ListaOpciones ;
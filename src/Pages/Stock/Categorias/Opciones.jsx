
import { Stack } from "@mui/material";
import { useCategoria } from "./CategoriaProvider";

import ButtonTip from "../../../Components/Botones/ButtonTip";

function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useCategoria()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <ButtonTip title='Editar' onClick={()=>{open(rowProps,'edit')}} icon='edit' />
        <ButtonTip onClick={()=>{open(rowProps,'delete')}} icon="delete_forever" /> 
    </Stack>
    )
}

export default ListaOpciones ;
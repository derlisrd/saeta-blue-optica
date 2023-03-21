import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import { useProveedor } from "./ProveedorProvider";
import { red } from "@mui/material/colors";

function Opciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useProveedor()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <IconButton onClick={()=>{open(rowProps,'edit')}}><Icon icon="tabler:edit" /></IconButton>
        <IconButton onClick={()=>{open(rowProps,'delete')}}><Icon color={red[300]} icon="tabler:trash" /> </IconButton>
    </Stack>
    )
}

export default Opciones ;
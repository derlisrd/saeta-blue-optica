import { Icon } from "@iconify/react";
import { IconButton, Stack, Tooltip } from "@mui/material";

import { red } from "@mui/material/colors";
import { useUsuarios } from "./UsuariosProvider";

function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useUsuarios()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row"> 
        <Tooltip title="Permisos" arrow ><IconButton onClick={()=>{open(rowProps,'permisos')}}><Icon icon="ic:twotone-vpn-key" /></IconButton></Tooltip>
        <IconButton onClick={()=>{open(rowProps,'edit')}}><Icon icon="tabler:edit" /></IconButton>
        <IconButton onClick={()=>{open(rowProps,'delete')}}><Icon color={red[300]} icon="tabler:trash" /> </IconButton>
    </Stack>
    )
}

export default ListaOpciones ;
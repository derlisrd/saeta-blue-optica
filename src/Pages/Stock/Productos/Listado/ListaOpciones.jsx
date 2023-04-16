import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import useGotoNavigate from '../../../../Hooks/useGotoNavigate'

function ListaOpciones({rowProps}) {
    
    
    return (<Stack direction="row"> 
        {rowProps.tipo_producto==="1" && <IconButton onClick={openStock} ><Icon icon="fluent-mdl2:product-release" /></IconButton> }
        <IconButton onClick={()=>{navigate(`/productos/edit/${rowProps.id_producto}`)}}><Icon icon="tabler:edit" /></IconButton>
        <IconButton onClick={()=>{}}><Icon color={red[300]} icon="tabler:trash" /> </IconButton>
    </Stack>)
}

export default ListaOpciones ;
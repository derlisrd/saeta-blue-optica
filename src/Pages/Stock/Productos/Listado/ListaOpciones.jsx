import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import useGotoNavigate from '../../../../Hooks/useGotoNavigate'

function ListaOpciones({rowProps}) {
    const {navigate} = useGotoNavigate()
    return (<Stack direction="row"> 
        <IconButton><Icon icon="fluent-mdl2:product-release" /></IconButton>
        <IconButton onClick={()=>{navigate(`/productos/edit/${rowProps.id_producto}`)}}><Icon icon="tabler:edit" /></IconButton>
        <IconButton onClick={()=>{}}><Icon color={red[300]} icon="tabler:trash" /> </IconButton>
    </Stack>)
}

export default ListaOpciones ;
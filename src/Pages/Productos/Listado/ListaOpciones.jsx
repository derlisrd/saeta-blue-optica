import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";

function ListaOpciones({rowProps}) {
    return (<Stack direction="row"> 
        <IconButton><Icon icon="fluent-mdl2:product-release" /></IconButton>
        <IconButton><Icon icon="tabler:edit" /></IconButton>
        <IconButton><Icon icon="tabler:trash" /> </IconButton>
    </Stack>)
}

export default ListaOpciones ;
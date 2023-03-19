import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

function AddButton({onClick, ...res}) {
    return ( <Button variant="contained" onClick={onClick} endIcon={<Icon icon="ic:twotone-add-circle" />}>Agregar</Button> );
}

export default AddButton;
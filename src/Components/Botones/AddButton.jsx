
import { Button,Icon } from "@mui/material";

function AddButton({onClick, ...res}) {
    return ( <Button variant="contained" onClick={onClick} endIcon={<Icon>add</Icon>}>Agregar</Button>);
}

export default AddButton;
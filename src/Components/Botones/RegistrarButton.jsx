import { Button } from "@mui/material";

function RegistrarButton({onClick}) {
    return ( <Button fullWidth size="large" onClick={onClick} variant="contained">Registrar</Button> );
}

export default RegistrarButton;
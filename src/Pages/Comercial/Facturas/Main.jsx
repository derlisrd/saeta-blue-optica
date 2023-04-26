import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../App/config";
import { useFacturas } from "./FacturasProvider";

function Main() {
    const {dialogs,setDialogs} = useFacturas()
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

    return (
    <Box>
        <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" onClick={abrir}>HACER FACTURA</Button>
            <Button size="large" variant="contained" component={Link} to={BASEURL +'/factura/lista'} >LISTA DE FACTURAS </Button>
        </Stack>
    </Box>);
}

export default Main;
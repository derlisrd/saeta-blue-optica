import { usePedidos } from "./PedidosProvider";
import { Box, Button, Stack } from "@mui/material";

function Main() {
    const {dialogs,setDialogs} = usePedidos()
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}
    
    return (<Box>
        <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" onClick={abrir}>HACER PEDIDO</Button>
            <Button size="large" variant="contained" onClick={()=>{}}>LISTA DE PEDIDOS</Button>
        </Stack>
    </Box>  );
}

export default Main;
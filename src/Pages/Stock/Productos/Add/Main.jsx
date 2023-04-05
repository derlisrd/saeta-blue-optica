import { Box, Button, Stack } from "@mui/material";
import { useAdd } from "./AddProvider";

function Main() {

    const {dialogs,setDialogs} = useAdd()
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

    return (<Box>
        <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" onClick={abrir}>AGREGAR PRODUCTO</Button>
        </Stack>
    </Box>  );
}

export default Main;
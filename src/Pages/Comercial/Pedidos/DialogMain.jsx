import { Dialog } from "@mui/material";
import { usePedidos } from "./PedidosProvider";



function DialogMain() {

    const {setDialogs,dialogs} = usePedidos()

    const close = ()=>{ setDialogs({...dialogs,main:false}) }

    return ( <Dialog open={dialogs.main} fullScreen >

    </Dialog> );
}

export default DialogMain;
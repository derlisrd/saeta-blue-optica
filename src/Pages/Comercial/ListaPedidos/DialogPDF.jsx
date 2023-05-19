import { Button, Dialog, DialogActions, DialogContent,Icon } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useRef } from "react";
import ReactToPdf from "react-to-pdf";

function DialogPDF() {

    const divPDFRef = useRef(null)
    const {dialogs,setDialogs} = useListaPedidos()
    const close = ()=>{
        setDialogs({...dialogs,pdf:false})
    }
    return (<Dialog fullScreen open={dialogs.pdf} onClose={close}>
            <DialogContent>
                <div ref={divPDFRef} style={{ width:'100%',background:'white', height:'100%',color:'black' }}>
                    

                </div>
            </DialogContent>
        <DialogActions>
            <ReactToPdf targetRef={divPDFRef} filename="pedidos.pdf"  scale={0.8}>
                {({toPdf}) => (
                    <Button startIcon={<Icon>picture_as_pdf</Icon>} variant="contained" onClick={toPdf}>BAJAR PDF</Button>
                )}
            </ReactToPdf>
            <Button onClick={close}>
                CERRAR
            </Button>
        </DialogActions>
    </Dialog> );
}

export default DialogPDF;
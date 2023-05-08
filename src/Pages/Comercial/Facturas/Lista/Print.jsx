import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import TablasDatos from "../Add/Print/TablasDatos";
import { useListaFactura } from "./ListaFacturaProvider";
import { useCallback, useEffect, useState, useRef} from "react";
import { useReactToPrint } from 'react-to-print';
import { APICALLER } from "../../../../Services/api";
import LoadingPage from "../../../../Components/UI/LoadingPage";

function Print() {

   const [factura,setFactura] = useState({})
   const {dialogs,setDialogs,formSelect} = useListaFactura()
    const [loading,setLoading] = useState(true)

    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });


   const getData = useCallback(async()=>{
        if(dialogs.print){
            let [fact,item] = await Promise.all([
                APICALLER.get({table:'facturas',where:`id_factura,=,${formSelect.id_factura}`,
                include:'clientes,users',
                on:'id_cliente,cliente_id,id_user,user_id',
                fields:'nro_factura,ruc_cliente,nombre_cliente,direccion_cliente,fecha_factura,tipo_factura,total_exenta,total_iva10,total_iva5,total_factura'
            }),
                APICALLER.get({table:'facturas_items',where:`factura_id,=,${formSelect.id_factura}`,
                include:'productos',on:'id_producto,producto_id',
                fields:'codigo_producto,cantidad_item,precio_item,id_producto,iva_item'
            })
            ])

            console.log(fact,item);
        }
   },[formSelect,dialogs])
    useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getData();}
    return () => {isActive = false; ca.abort();};
}, [getData]);

    return ( <Dialog open={dialogs.print} onClose={() => {}} fullScreen>
    <DialogContent>
      {
        loading ? <LoadingPage /> : <div id="id_print_preimpreso" className="print_main" ref={divRef}>
        <TablasDatos factura={factura} />
        <TablasDatos factura={factura} />
        <TablasDatos factura={factura} />
      </div>
      }
    </DialogContent>
    <DialogActions>
      
    <Button variant="contained" size="large" onClick={handlePrint}>
        Imprimir
      </Button> 
      <Button variant="contained" size="large" onClick={close}>
        Cerrar
      </Button>
      
    </DialogActions>
  </Dialog> );
}

export default Print;
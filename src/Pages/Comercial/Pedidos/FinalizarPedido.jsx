import { Button, Dialog, DialogActions, DialogContent, DialogTitle,  LinearProgress } from "@mui/material";
import { usePedidos } from "./PedidosProvider";

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from "../../../Providers/AuthProvider";
import './stylos.css'
import { funciones } from "../../../App/helpers/funciones";
import { useState } from "react";
import { APICALLER } from "../../../Services/api";
import useInitialStates from "./useInitialStates";
import Ticket from "./Print/Ticket";
import swal from "sweetalert";
import ButtonTip from "../../../Components/Botones/ButtonTip";

function FinalizarPedido() {

    const {initialFactura} = useInitialStates()
    const {userData} = useAuth()
    const [finalizado,setFinalizado] = useState(false)
    const {token_user,id_user} = userData
    const {dialogs,setDialogs,factura,setearFactura,lastID,setLastID} = usePedidos()
    const [loading,setLoading] = useState(false)

    
    const atras = ()=>{
        if(finalizado){
            setearFactura(initialFactura)
        }
        setDialogs({...dialogs,finalizar:false})
    }

    const close = async()=>{ 
        let f = {...factura}
        setLoading(true)
        let datos = {
            cliente_id_pedido: f.cliente.id_cliente,
            fecha_pedido: `${funciones.getFechaHorarioString()}`,
            total_pedido: f.total,
            total_exenta: f.exenta,
            total_iva5: f.iva5,
            total_iva10: f.iva10,
            obs_cliente: f.obs.cliente,
            obs_laboratorio: f.obs.laboratorio,
            armazon_id: f.obs.armazon_id,
            estado_pedido:1,
            tipo_pedido:f.tipo_pedido,
            user_id_pedido:id_user,
            codigo_cliente_pedido: f.codigo_cliente_pedido,
            motivo_cancela:''
        }

        
        let res = await APICALLER.insert({table:'pedidos',data:datos,token:token_user})
        if(res.response)
        {
            let id_pedido = res.last_id, pedidos_items;
            setLastID(id_pedido)
            
            let promises = [];
            f.items.forEach(e=>{
                pedidos_items = {
                    pedido_id: id_pedido,
                    cantidad_pedido: e.cantidad,
                    producto_id_item: e.id_producto,
                    precio_venta_item: e.precio,
                    deposito_id_item: e.id_productos_deposito ?? 0,
                }
                promises.push(APICALLER.insert({table:'pedidos_items',token:token_user,data:pedidos_items}))
            })
            let receta_data = { ...f.receta,
                pedido_id_receta: id_pedido
            }
            promises.push(APICALLER.insert({table:'recetas',token:token_user,data:receta_data}))
            await Promise.all(promises)
        }else{
            console.log(res);
            swal({title:'Error',text:'Ocurrió un error con la conexión a internet',icon:'warning'})
            setLoading(false)
            setFinalizado(false)
            return;
        }
        setLoading(false) 
        setFinalizado(true)
    }

    const divRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
      });
      


    return ( <Dialog open={dialogs.finalizar} onClose={atras} fullScreen >
        <DialogTitle><ButtonTip onClick={atras} title='Atrás' icon='arrow_back' />  Imprimir pedido</DialogTitle>
        <DialogContent>
            {loading ? <LinearProgress /> :
            <div ref={divRef} id="print">
            <Ticket factura={factura} nro={lastID} userData={userData} /> 
            </div>
            }
        </DialogContent>
        <DialogActions>
            {
                finalizado ? <Button variant="outlined" size="large" onClick={atras}>CERRAR PEDIDO</Button> :
                <Button color="info" variant="outlined" onClick={close} size="large"> FINALIZAR </Button>
            }
            <Button color="success" variant="contained" disabled={!finalizado} onClick={handlePrint} size="large"> IMPRIMIR </Button>
        </DialogActions>
    </Dialog> );
}

export default FinalizarPedido;
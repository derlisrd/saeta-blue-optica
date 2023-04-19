import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { Icon } from "@iconify/react";
import printJS from "print-js";
import { useAuth } from "../../../Providers/AuthProvider";
import './stylos.css'
import { funciones } from "../../../App/helpers/funciones";
import { useState } from "react";
import { APICALLER } from "../../../Services/api";
import useInitialStates from "./useInitialStates";

function FinalizarPedido() {

    const {initialFactura} = useInitialStates()
    const {userData} = useAuth()
    const {token_user,id_user} = userData
    const {dialogs,setDialogs,factura,setearFactura} = usePedidos()
    const [loading,setLoading] = useState(false)
    
    const atras = ()=>{
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
            entregado_pedido:0,
            user_id_pedido:id_user
        }

        
        let res = await APICALLER.insert({table:'pedidos',data:datos,token:token_user})
        if(res.response)
        {
            let id_pedido = res.last_id, pedidos_items;
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

        }else{console.log(res);}
        setDialogs({...dialogs,finalizar:false})
        setearFactura(initialFactura)
        setLoading(false) 
    }

    const imprimir = ()=>{
        printJS({ type: "html", printable: "print",
        style:`#print{font-family:monospace;margin:0;font-size:10px;width: 100%;padding:1rem;}#print h1 {font-size:1rem;text-align: center;}.table_pedido{border-collapse: collapse;border:none;margin:10px auto;width: 80mm;}.table_pedido tr td{padding:5px;}.table_head{font-variant: small-caps;font-weight: bold;border-radius: 8px;background-color: rgb(241, 241, 241);}`
    });
    }

    return ( <Dialog open={dialogs.finalizar} onClose={atras} fullScreen >
        <DialogTitle><IconButton onClick={atras}><Icon icon="ic:baseline-arrow-back" /> </IconButton> Imprimir pedido</DialogTitle>
        <DialogContent>
            {loading && <LinearProgress />}
            <div id="print">
                <table className="table_pedido" width='100%'>
                    <tbody>
                        <tr><td><h1>PEDIDO NRO: {1} - USO INTERNO</h1></td></tr>
                        <tr><td>FECHA: {factura.fecha} {factura.hora}</td></tr>
                        <tr>
                            <td>Vendedor: {userData.nombre_user}</td>
                        </tr>
                        <tr><td>DOC: {factura.cliente.ruc_cliente}</td></tr>
                        <tr><td>CLIENTE: {factura.cliente.nombre_cliente} </td></tr>
                        <tr><td>DIRECCION: {factura.cliente.direccion_cliente} </td></tr>
                    </tbody>
                </table>
                <table className="table_pedido" width='100%' border='1'>
                <tbody>
                <tr className="table_head">
                    <td>COD.</td>
                    <td>CANT.</td>
                    <td>DESCRIP</td>
                    <td>PRECIO</td>
                </tr>
                {
                factura.items.map((e,i)=>(
                    <tr key={i} >
                        <td>{e.codigo}</td>
                        <td>{e.cantidad}</td>
                        <td>{e.descripcion}</td>
                        <td>{funciones.numberFormat(e.precio * e.cantidad)}</td>
                    </tr>
                ))
                }
                </tbody>
                </table>
                <h1>RECETA</h1>
                <table className="table_pedido" border='1'>
                    <thead>
                        <tr>
                            <th>OJO DERECHO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width='25%'></td>
                            <td width='25%'><b>ESF</b></td>
                            <td width='25%'><b>CIL</b></td>
                            <td width='25%'><b>EJE</b></td>
                        </tr>
                        <tr>
                            <td width='25%'><b>LEJOS</b></td>
                            <td width='25%'>{factura.receta.lejos_derecho_esferico}</td>
                            <td width='25%'>{factura.receta.lejos_derecho_cilindrico}</td>
                            <td width='25%'>{factura.receta.lejos_eje_derecho}</td>
                        </tr>
                        <tr>
                            <td width='25%'><b>ADICION</b></td>
                            <td width='25%'>{factura.receta.adicion_derecho}</td>
                            <td width='25%'></td>
                            <td width='25%'></td>
                        </tr>
                        <tr>
                            <td width='25%'><b>CERCA</b></td>
                            <td width='25%'>{factura.receta.cerca_derecho_esferico}</td>
                            <td width='25%'>{factura.receta.cerca_derecho_cilindrico}</td>
                            <td width='25%'>{factura.receta.cerca_eje_derecho}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table_pedido" border='1'>
                    <thead>
                        <tr>
                            <th>OJO IZQUIERDO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td width='25%'></td>
                            <td width='25%'><b>ESF</b></td>
                            <td width='25%'><b>CIL</b></td>
                            <td width='25%'><b>EJE</b></td>
                        </tr>
                        <tr>
                            <td width='25%'><b>LEJOS</b></td>
                            <td width='25%'>{factura.receta.lejos_izquierdo_esferico}</td>
                            <td width='25%'>{factura.receta.lejos_izquierdo_cilindrico}</td>
                            <td width='25%'>{factura.receta.lejos_eje_izquierdo}</td>
                        </tr>
                        <tr>
                            <td width='25%'><b>ADICION</b></td>
                            <td width='25%'>{factura.receta.adicion_izquierdo}</td>
                            <td width='25%'></td>
                            <td width='25%'></td>
                        </tr>
                        <tr>
                            <td width='25%'><b>CERCA</b></td>
                            <td width='25%'>{factura.receta.cerca_izquierdo_esferico}</td>
                            <td width='25%'>{factura.receta.cerca_izquierdo_cilindrico}</td>
                            <td width='25%'>{factura.receta.cerca_eje_izquierdo}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table_pedido" border='1'>
                    <tbody>
                        <tr>
                            <td>
                                OBS LABORATORIO: {factura.obs.laboratorio} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                OBS CLIENTE: {factura.obs.cliente} 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DialogContent>
        <DialogActions>
            <Button color="info" variant="outlined" onClick={close} size="large"> FINALIZAR </Button>
            <Button color="success" variant="contained" onClick={imprimir} size="large"> IMPRIMIR </Button>
        </DialogActions>
    </Dialog> );
}

export default FinalizarPedido;
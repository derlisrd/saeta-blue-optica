import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, LinearProgress } from "@mui/material";
import { Icon } from "@iconify/react";
import printJS from "print-js";
import './stylos.css'
import { funciones } from "../../../App/helpers/funciones";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useCallback, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { env } from "../../../App/config";
import { useAuth } from "../../../Providers/AuthProvider";


function DialogImprimir() {
    const {dataEmpresa} = useAuth()
    const {dialogs,setDialogs,formSelect} = useListaPedidos()
    const [loading,setLoading] = useState(true)
    
    const [factura,setFactura] = useState({
        items:[],
        receta:{},
        datos:{},
        armazon:''
    })

    const imprimir = ()=>{
        printJS({ type: "html", printable: "print",
        style:`#print{width:80mm;font-weight:bold;font-family:monospace;margin:0 auto;font-size:10px;padding:1rem;}#print h1 {font-size:1rem;text-align: center;}.table_pedido{border-collapse: collapse;border:none;margin:10px auto;width: 80mm;}.table_pedido tr td{padding:5px;}.table_head{font-variant: small-caps;font-weight: bold;border-radius: 8px;background-color: rgb(241, 241, 241);}`
        });
    }

    const atras = ()=>{setDialogs({...dialogs,imprimir:false}) }

    const getLista = useCallback(async()=>{
       if(dialogs.imprimir){
        setLoading(true)
            let [fact,items,receta] = await Promise.all([
                APICALLER.get({table:'pedidos',include:'users,clientes',
                on:'id_user,user_id_pedido,id_cliente,cliente_id_pedido',where:`id_pedido,=,${formSelect.id_pedido}`,
                fields:'armazon_id,total_pedido,nombre_cliente,ruc_cliente,direccion_cliente,nombre_user,fecha_pedido,estado_pedido,id_pedido,obs_cliente,obs_laboratorio,codigo_cliente_pedido'
                }),
                APICALLER.get({table:'pedidos_items',include:'productos',on:'id_producto,producto_id_item',where:`pedido_id,=,${formSelect.id_pedido}`}),
                APICALLER.get({table:'recetas',where:`pedido_id_receta,=,${formSelect.id_pedido}`})
        ])
        if(fact.response){
            const arm = env.ARMAZONES.find(e=> e.id_armazon === fact.first.armazon_id)
            setFactura({
                items:items.results,
                datos: fact.first,
                receta: receta.first,
                armazon:arm.nombre_armazon
            })
        }else{
            console.log(fact,items,receta);
        }
        setLoading(false)
       }
    },[formSelect,dialogs])

    

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);


    return ( <Dialog open={dialogs.imprimir} onClose={atras} fullWidth maxWidth="xs" >
            <DialogContent>
            {loading ? <LinearProgress /> : 
            <div id="print">
                <table className="table_pedido" width='100%'>
                    <tbody>
                        <tr><td><h1> {dataEmpresa.nombre_empresa}</h1></td></tr>
                        <tr><td><h1>PEDIDO NRO: {factura.datos.id_pedido} - USO INTERNO</h1></td></tr>
                        <tr><td>FECHA: {factura.datos.fecha_pedido}</td></tr>
                        <tr><td>Vendedor: {factura.datos.nombre_user}</td></tr>
                        <tr><td>DOC: {factura.datos.ruc_cliente}</td></tr>
                        <tr><td>CLIENTE: {factura.datos.nombre_cliente} </td></tr>
                        <tr><td>CODIGO CLIENTE: {factura.datos.codigo_cliente_pedido} </td></tr>
                        <tr><td>DIRECCION: {factura.datos.direccion_cliente} </td></tr>
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
                        <td>{e.codigo_producto}</td>
                        <td>{e.cantidad_pedido}</td>
                        <td>{e.nombre_producto}</td>
                        <td>{funciones.numberFormat(e.precio_venta_item * e.cantidad_pedido)}</td>
                    </tr>
                ))
                }
                <tr><td align="right" colSpan={4}>TOTAL: {funciones.numberFormat(factura.datos.total_pedido)}</td></tr>
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
                                ARMAZON: {factura.armazon} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                OBS LABORATORIO: {factura.datos.obs_laboratorio} 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                OBS CLIENTE: {factura.datos.obs_cliente} 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>}
            </DialogContent>
        <DialogActions>
            <Button color="info" variant="outlined" onClick={atras} size="large"> CERRAR </Button>
            <Button color="success" variant="contained" onClick={imprimir} size="large"> IMPRIMIR </Button>
        </DialogActions>
    </Dialog> );
}

export default DialogImprimir;
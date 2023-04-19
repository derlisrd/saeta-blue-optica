import { funciones } from "../../../../App/helpers/funciones";


function Ticket({factura,userData,nro}) {
    return ( <div id="print">
    <table className="table_pedido" width='100%'>
        <tbody>
            <tr><td><h1>PEDIDO NRO: {nro} - USO INTERNO</h1></td></tr>
            <tr><td>FECHA: {factura.fecha} {factura.hora}</td></tr>
            <tr><td>VENDEDOR: {userData.nombre_user}</td></tr>
            <tr><td>DOC: {factura.cliente.ruc_cliente}</td></tr>
            <tr><td>CLIENTE: {factura.cliente.nombre_cliente} </td></tr>
            <tr><td>CODIGO CLIENTE: {factura.codigo_cliente_pedido} </td></tr>
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
    <tr><td align="right" colSpan={4}><b>TOTAL: {funciones.numberFormat(factura.total)} </b></td></tr>
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
</div> );
}

export default Ticket;
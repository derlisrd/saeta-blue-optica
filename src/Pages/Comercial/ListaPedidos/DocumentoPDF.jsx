import { funciones } from "../../../App/helpers/funciones";


function DocumentoPDF({selectCliente,desde,hasta,lista,detalles}) {
    return ( <div  id='_pdf'>
    <table width='100%' className="_pdf_detalles">
        <tbody>
            <tr>
                <th>
                    CLIENTE: {selectCliente.id_cliente} {selectCliente.nombre_cliente} {selectCliente.ruc_cliente}
                </th>
            </tr>
            <tr>
                <th>
                    FECHA INICIO: {desde}
                </th>
            </tr>
            <tr>
                <th>
                    FECHA FIN: {hasta}
                </th>
            </tr>
        </tbody>
    </table>
    <table width='100%'>
        <tbody>
            <tr className="_pdf_head">
                <td>Fecha</td>
                <td>NroPedido</td>
                <td>Codigo</td>
                <td>Prod./Serv.</td>
                <td>Cant</td>
                <td>Total</td>
            </tr>
            {
                lista.map((e,i)=>(
                    <tr key={i}>
                <td>{e.fecha_pedido}</td>
                <td>{e.id_pedido}</td>
                <td>{e.codigo_producto}</td>
                <td>{e.nombre_producto}</td>
                <td>{e.cantidad_pedido}</td>
                <td>{e.precio_venta_item}</td>
            </tr>
                ))
            }
            <tr>
                <th colSpan={5}>
                    TOTAL:
                </th>
                <th> 
                    {funciones.numberFormat( detalles.total )}
                </th>
            </tr>
        </tbody>
    </table>
</div> );
}

export default DocumentoPDF;
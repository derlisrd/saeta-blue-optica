import { funciones } from "../../../../../App/helpers/funciones";

function TablasDatos({factura}) {

    return ( <>
            <table className="tablas nro_factura">
              <tbody>
                <tr>
                  <td width="70%"></td>
                  <td width="30%" valign="bottom" align="center">
                    {factura.nro_factura}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="tablas info_cliente">
              <tbody>
                <tr>
                  <td width="15%"></td>
                  <td width="65%">
                    <p>{factura.fecha}</p>
                    <p>{factura.cliente.nombre_cliente}</p>
                    <p>{factura.cliente.direccion_cliente}</p>
                    <p>{factura.cliente.ruc_cliente}</p>
                  </td>
                  <td>
                    <b>{factura.tipo_factura==='1' ? 'CONTADO' : 'CREDITO'}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className='tablas descripciones' >
                    <tbody>{
                        factura.items.map((e,i)=>(
                            <tr key={i}>
                            <td width='7%' valign="top" align="left">{e.codigo_producto}</td>
                            <td width='5%' valign="top"  align="left">{e.cantidad}</td>
                            <td width='40%' valign="top" >{e.nombre_producto}</td>
                            <td width='12%' valign="top" >{funciones.numberFormat(e.precio)}</td>
                            <td width='12%' valign="top" >{e.iva===0 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</td>
                            <td width='12%' valign="top" >{e.iva===5 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</td>
                            <td width='12%' valign="top" >{e.iva===10 ? funciones.numberFormat(e.precio * e.cantidad) : 0}</td>
                        </tr>
                        ))
                     }
                    </tbody>
                </table>
                <table className='tablas subtotales' >
                    <tbody>
                        <tr>
                            <td width='64%'></td>
                            <td width='12%'>{funciones.numberFormat(factura.exenta)}</td>
                            <td width='12%'>{funciones.numberFormat(factura.iva5)}</td>
                            <td width='12%'>{funciones.numberFormat(factura.iva10)}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}> {funciones.NumeroALetras(factura.total,"")}</td>
                            <td > {funciones.numberFormat(factura.total)}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='tablas liquidacion_iva' >
                    <tbody>
                        <tr>
                            <td width='30%'></td>
                            <td width='20%'>{funciones.numberFormat(factura.liquiiva5)}</td>
                            <td width='20%'>{funciones.numberFormat(factura.liquiiva10)}</td>
                            <td width='30%'>{funciones.numberFormat(factura.liquiivatotal)}</td>
                        </tr>
                    </tbody>
                </table>
                </>
 );
}

export default TablasDatos;
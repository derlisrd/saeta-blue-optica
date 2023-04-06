
function TablaItems({items}) {
    return (<table width="100%">
        <tbody>
            <tr>
                <td width="20%">Can</td>
                <td width="40%">Des</td>
                <td width="20%">Pre</td>
                <td width="20%">Opc</td>
            </tr>
            {
                items.map((e,i)=>(
                    <tr key={i}>
                        <td width="20%">{e.cantidad}</td>
                        <td width="40%">{e.descripcion}</td>
                        <td width="20%">{e.precio}</td>
                        <td width="20%">
                            
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>  );
}

export default TablaItems;
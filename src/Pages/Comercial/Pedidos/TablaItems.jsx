import { IconButton, Stack } from "@mui/material";
import { funciones as f } from "../../../App/helpers/funciones";
import { Icon } from "@iconify/react";

function TablaItems({items}) {
    return (<table width="100%">
        <tbody>
            <tr>
                <td width="10%">Cant</td>
                <td width="20%">Cod</td>
                <td width="30%">Descripción</td>
                <td width="20%">Pre</td>
                <td width="20%">Opc</td>
            </tr>
            {
                items.map((e,i)=>(
                    <tr key={i}>
                        <td width="10%">{e.cantidad}</td>
                        <td width="20%">{e.codigo}</td>
                        <td width="30%">{e.descripcion}</td>
                        <td width="20%">{ f.numberFormat(e.precio)}</td>
                        <td width="20%">
                            <Stack direction="row">
                                <IconButton onClick={()=>{}}><Icon color="red" icon="tabler:trash" /></IconButton>
                            </Stack>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>  );
}

export default TablaItems;
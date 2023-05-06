import {  Stack } from "@mui/material";
import { funciones as f } from "../../../App/helpers/funciones";
import styles from './styles.module.css'
import { usePedidos } from "./PedidosProvider";
import IconButtonTip from "../../../Components/Botones/IconButtonTip";

function TablaItems({items}) {

    const {setearFactura,factura,dialogs,setDialogs,setIndexCambioPrecio} = usePedidos()

    const mas = i=>{
        let fact = {...factura}
        fact.items[i].cantidad += 1
        setearFactura(fact)
    }

    const menos = i =>{
        let fact = {...factura}
        let new_cantidad = fact.items[i].cantidad - 1 
        if(new_cantidad>0){
            fact.items[i].cantidad = new_cantidad
            setearFactura(fact)
        }
    }

    const borrar = i=>{
        let fact = {...factura}
        fact.items.splice(i,1)
        setearFactura(fact)
    }

    const precio = i=>{
        setIndexCambioPrecio(i)
        setDialogs({...dialogs,precio:true})
    }

    return (<table width="100%">
        <tbody>
            <tr className={styles.head} >
                <td className={styles.head_cantidad} width="10%">Cant</td>
                <td width="20%">Codigo</td>
                <td width="30%">Descripción</td>
                <td width="20%">Precio</td>
                <td width="20%">Opcion</td>
            </tr>
            {
                items.map((e,i)=>(
                    <tr key={i} className={styles.items}>
                        <td width="10%">
                            <Stack spacing={0} direction="row" alignContent="flex-start" justifyContent="flex-start" >
                                <IconButtonTip title='Menos' onClick={()=>{menos(i)}} icon={{ name:'remove', color:'inherit' }} />
                                <span className={styles.cantidad} >{e.cantidad}</span>
                                <IconButtonTip onClick={()=>{mas(i)}} title="Más" icon={{ name:'add', color:'inherit' }}  />
                            </Stack>
                        </td>
                        <td width="20%">{e.codigo}</td>
                        <td width="30%">{e.descripcion}</td>
                        <td width="20%">{ f.numberFormat(e.precio)}</td>
                        <td width="20%">
                            <Stack direction="row">
                                <IconButtonTip onClick={()=>{precio(i)}} title='Cambia precio' icon={{ name:'price_change',color:'warning' }} />
                                <IconButtonTip onClick={()=>{borrar(i)}} title='Borrar item' icon={{ name:'delete_forever',color:'error' }} />
                            </Stack>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    </table>  );
}

export default TablaItems;
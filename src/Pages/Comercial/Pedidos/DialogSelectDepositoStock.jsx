import { Dialog, DialogTitle,DialogContent, TextField, Grid, Stack, DialogActions, Button } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import styles from './styles.module.css'
import { useState } from "react";

function DialogSelectDepositoStock() {

    const {setDialogs,dialogs,formDepositoStock,setearFactura,factura} = usePedidos()
    const [search,setSearch] = useState({
        eje:'',
        cil:'',
        esf:''
    })
    const handleChange = e => setSearch({...search,[e.target.name]:e.target.value})

    const select = (val)=>{
        let new_fact = {...factura}
        let tipo =  parseInt(val.tipo_producto), id_producto = val.id_producto
        let index = new_fact.items.findIndex(e => e.id_productos_deposito.toLowerCase() === val.id_productos_deposito.toLowerCase());
        let found = new_fact.items.filter(i => i.id_productos_deposito.toLowerCase() === val.id_productos_deposito.toLowerCase());

        if (found.length > 0) {
            new_fact.items[index].cantidad += 1 
        }else{
            let nuevo_item = {
                id_productos_deposito:val.id_productos_deposito,
                cantidad:1,
                precio: parseFloat(val.precio_producto),
                preciom: parseFloat(val.precio_producto),
                descripcion:`${val.nombre_producto} ${val.graduacion_esferico} ${val.graduacion_cilindrico} `,
                id_producto,
                codigo:val.codigo_producto,
                tipo,
                iva:parseFloat(val.precio_producto)                    
            }
            new_fact.items.push(nuevo_item)
        }
        setearFactura(new_fact)
    }

    const close = ()=>{ setDialogs({...dialogs,select_deposito_stock:false}) }
    //const FilterData =  lista.productos.filter(item => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase())|| item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase()));
    const filtrado  = formDepositoStock.filter(item=> item.graduacion_esferico.includes(search.esf) )
    return ( <Dialog open={dialogs.select_deposito_stock} fullWidth onClose={close} >
        <DialogTitle>Seleccionar item</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                        <TextField size="small" name="cil" value={search.cil} onChange={handleChange} label="Cilindrico" />
                        <TextField size="small" name="esf" value={search.esf} onChange={handleChange} label="Esférico" />
                        <TextField size="small" name="eje" value={search.eje} onChange={handleChange} label="Eje" />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                <table className={styles.table} width="100%" border={1}>
                    <tbody>
                        <tr>
                            <th>Esférico</th>
                            <th>Cilindrico</th>
                            <th>Eje</th>
                            <th>Stock disponible</th>
                            <th>Acción</th>
                        </tr>
                        
                        {
                            filtrado.map((e,i)=>(
                            <tr key={i} className={styles.items_stock}>
                                <td>{e.graduacion_esferico}</td>
                                <td>{e.graduacion_cilindrico}</td>
                                <td>{e.eje}</td>
                                <td>{e.stock_producto_deposito}</td>
                                <td>
                                    <Button variant="contained" size="small" onClick={()=>{select(e)}} >Selecciona</Button>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogSelectDepositoStock;
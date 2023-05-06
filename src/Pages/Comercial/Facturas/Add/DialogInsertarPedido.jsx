import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,LinearProgress,TextField } from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import { APICALLER } from "../../../../Services/api";
import { useState } from "react";

function DialogInsertarPedido() {
    const {setDialogs,dialogs,setearFactura,factura,setPedidos,pedidos} = useFacturas()
    const [loading,setLoading] = useState(false)
    const close = ()=>{ 
        setDialogs({...dialogs,insertar_pedido:false});
    }
    console.log(pedidos);
    const cambiar = async(e)=>{
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const data = Object.fromEntries(myFormData.entries());
        setLoading(true)
        let [res,client] = await Promise.all([APICALLER.get({table:'pedidos_items',
        fields:'precio_venta_item,nombre_producto,codigo_producto,cantidad_pedido,id_producto,iva_producto,precio_producto,preciom_producto',
        include:'productos',on:'producto_id_item,id_producto',where:`pedido_id,=,${data.nro_pedido}`}),
        APICALLER.get({table:'pedidos',include:'clientes',on:'id_cliente,cliente_id_pedido',fields:'nombre_cliente,ruc_cliente,direccion_cliente,id_cliente'})
        ])
        
        
        if(res.response && res.found>0 && client.response){
          let p = [...pedidos]
          p.push(data.nro_pedido)
          let f  = {...factura}
          f.cliente = {
            id_cliente:client.first.id_cliente,
            ruc_cliente:client.first.ruc_cliente,
            nombre_cliente:client.first.nombre_cliente,
            direccion_cliente:client.first.direccion_cliente
          }
          res.results.forEach(val => {
            let nuevo_item = {
              id_pedido_insert: data.nro_pedido,
              cantidad: parseFloat(val.cantidad_pedido) ,
              precio_normal:parseFloat(val.precio_producto),
              precio: parseFloat(val.precio_venta_item),
              preciom: parseFloat(val.preciom_producto),
              nombre_producto:val.nombre_producto,
              id_producto:val.id_producto,
              codigo_producto:val.codigo_producto,
              iva:parseInt(val.iva_producto)                 
              }
            f.items.push(nuevo_item)
          });
          setPedidos(p)
          setearFactura(f)

        }
        setLoading(false)
        close();
    }


    return (
      <Dialog open={dialogs.insertar_pedido} fullWidth onClose={close}>
        <DialogTitle>NRO PEDIDO</DialogTitle>
        <form onSubmit={cambiar}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {
                loading && <LinearProgress />
              }
            </Grid>
            <Grid item xs={12}>
                <TextField required name="nro_pedido" fullWidth autoFocus />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" type="submit" >GUARDAR</Button>
            <Button variant="contained" onClick={close}>Cancelar</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
}

export default DialogInsertarPedido;
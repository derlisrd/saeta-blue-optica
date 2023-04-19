import { Dialog, DialogTitle,DialogContent,  Grid,  DialogActions, Button, IconButton, Typography } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import styles from './styles.module.css'
import { useState } from "react";
import { Icon } from "@iconify/react";
import InputNumerico from "./Components/InputNumerico";

function DialogSelectDepositoStock() {

    const {setDialogs,dialogs,formDepositoStock,setearFactura,factura,selectProduct} = usePedidos()
    
    const initialParam = {
        lejos_derecho_esferico:'0',
        lejos_derecho_cilindrico:'0',
        lejos_izquierdo_cilindrico:'0',
        lejos_izquierdo_esferico:'0',
        lejos_eje_derecho:'0',
        lejos_eje_izquierdo:'0',

        cerca_derecho_esferico:'0',
        cerca_derecho_cilindrico:'0',
        cerca_izquierdo_cilindrico:'0',
        cerca_izquierdo_esferico:'0',
        cerca_eje_derecho:'0',
        cerca_eje_izquierdo:'0',
        adicion_izquierdo:'0',
        adicion_derecho:'0'
    }
   const [param,setParam] = useState(initialParam)

    const change = e=>{
        const {value,name} = e.target
        let p = {...param}

        if( name === 'lejos_derecho_esferico' && !(parseFloat(p.cerca_derecho_esferico))==0 ){
            p.lejos_derecho_esferico = value
            p.adicion_derecho = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.cerca_derecho_esferico) 
            setParam(p)
            return;
        }

        

        if( name === 'lejos_izquierdo_esferico' && !(parseFloat(p.cerca_derecho_esferico))==0 ){
            p.lejos_izquierdo_esferico = value
            p.adicion_izquierdo = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.cerca_izquierdo_esferico) 
            setParam(p)
            return;
        }

        if(name=== 'cerca_derecho_esferico'){
            p.cerca_derecho_esferico = value
            p.adicion_derecho = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.cerca_derecho_esferico) 
            setParam(p)
            return;
        }

        if(name=== 'cerca_izquierdo_esferico'){
            p.cerca_izquierdo_esferico = value
            p.adicion_izquierdo = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.cerca_izquierdo_esferico) 
            setParam(p)
            return;
        }

        if(name=== 'adicion_derecho'){
            p.adicion_derecho = value;
            p.cerca_derecho_esferico = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.adicion_derecho) 
            setParam(p)
            return;
        }

        if(name=== 'adicion_izquierdo'){
            p.adicion_izquierdo = value;
            p.cerca_izquierdo_esferico = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.adicion_izquierdo) 
            setParam(p)
            return;
        }

        setParam({...param, [name]:value})
    }

    const insertarReceta = ()=>{
        let new_fact = {...factura}
        new_fact.receta = {...param}
        setearFactura(new_fact)
        close()
    }


    const close = ()=>{ setDialogs({...dialogs,select_deposito_stock:false}); }



    return ( <Dialog open={dialogs.select_deposito_stock} fullWidth maxWidth="lg" onClose={close} >
        <DialogTitle><IconButton onClick={close} ><Icon icon="ic:twotone-close" /> </IconButton> {selectProduct?.codigo_producto} - { selectProduct?.nombre_producto}  </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12}><Typography variant="button">LEJOS</Typography></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO:</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico autoFocus  name="lejos_derecho_esferico" onChange={change} value={param.lejos_derecho_esferico} fullWidth label='Esférico' /> </Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_derecho_cilindrico" onChange={change} value={param.lejos_derecho_cilindrico}  label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_eje_derecho" onChange={change} value={param.lejos_eje_derecho}  label='Eje' /></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO:</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_izquierdo_esferico" onChange={change} value={param.lejos_izquierdo_esferico} fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_izquierdo_cilindrico" onChange={change} value={param.lejos_izquierdo_cilindrico}  label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="lejos_eje_izquierdo" onChange={change} value={param.lejos_eje_izquierdo}  label='Eje' /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12}><Typography variant="button">CERCA</Typography></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_derecho_esferico" onChange={change} value={param.cerca_derecho_esferico} fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_derecho_cilindrico" onChange={change} value={param.cerca_derecho_cilindrico}   label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_eje_derecho" onChange={change} value={param.cerca_eje_derecho}  label='Eje' /></Grid>
                        <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO</Typography></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_izquierdo_esferico" onChange={change} value={param.cerca_izquierdo_esferico}  fullWidth label='Esférico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_izquierdo_cilindrico" onChange={change} value={param.cerca_izquierdo_cilindrico}   label='Cilindrico' /></Grid>
                        <Grid item xs={12} sm={3}><InputNumerico  name="cerca_eje_izquierdo" onChange={change} value={param.cerca_eje_izquierdo}  label='Eje' /></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                        <Grid item xs={12} sm={12}><Typography variant="overline">ADICION</Typography></Grid>
                        <Grid item xs={12} sm={6}><InputNumerico  name="adicion_derecho" onChange={change} value={param.adicion_derecho} fullWidth label='Derecho' /></Grid>
                        <Grid item xs={12} sm={6}><InputNumerico  name="adicion_izquierdo" onChange={change} value={param.adicion_izquierdo} fullWidth label='Izquierdo' /></Grid>
                        
                    </Grid>
                </Grid>
                


                <Grid item xs={12}>
                   <Typography variant="button">STOCK DISPONIBLE</Typography>
                </Grid>
                <Grid item xs={12}>
                <table className={styles.table} width="100%" border={1}>
                    <tbody>
                        <tr>
                            <th width='25%'>Esférico</th>
                            <th width='25%'>Cilindrico</th>
                            <th width='25%'>Eje</th>
                            <th width='25%'>Stock disponible</th>
                        </tr>
                        
                        {
                            formDepositoStock.map((e,i)=>(
                            <tr key={i} className={styles.items_stock}>
                                <td width='25%'>{e.graduacion_esferico}</td>
                                <td width='25%'>{e.graduacion_cilindrico}</td>
                                <td width='25%'>{e.eje}</td>
                                <td width='25%'>{e.stock_producto_deposito}</td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={insertarReceta}>Insertar</Button>
            <Button variant="outlined" onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogSelectDepositoStock;
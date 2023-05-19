import { Dialog, DialogTitle,DialogContent,  Grid,  DialogActions, Button,  Typography } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import styles from './styles.module.css'
import { useCallback, useState,useEffect } from "react";
import InputNumerico from "./Components/InputNumerico";
import ButtonTip from "../../../Components/Botones/ButtonTip";


function EditReceta() {
    const {setDialogs,dialogs,formDepositoStock,setearFactura,factura,selectProduct,selectIndex,idUpdate} = usePedidos()


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
        adicion_derecho:'0',

        dnp_izquierdo:'0',
        dnp_derecho:'0',

        codigo_derecho:'',
        codigo_izquierdo:'',

        altura_derecho:'0',
        altura_izquierdo:'0'
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
            let valor = parseFloat(value)
            p.cerca_derecho_esferico = valor
            if(!valor===0){
                p.adicion_derecho = parseFloat(p.lejos_derecho_esferico) + parseFloat(p.cerca_derecho_esferico) 
                setParam(p)
            }
            return;
        }

        if(name=== 'cerca_izquierdo_esferico'){
            let valor = parseFloat(value)
            p.cerca_izquierdo_esferico = valor
            if(!valor===0){
                p.adicion_izquierdo = parseFloat(p.lejos_izquierdo_esferico) + parseFloat(p.cerca_izquierdo_esferico) 
                setParam(p)
            }
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
        new_fact.items[selectIndex].receta = {...param}
        //console.log(selectIndex);
        //new_fact.receta = {...param}
        setearFactura(new_fact)
        close()
    }

    

    const key = e=>{
        const {value,name} = e.target
        let p = {...param}
        
        if(e.key==='ArrowUp'){
            let nuevo_valor = parseFloat(value) + 0.25
            p[name] = nuevo_valor
            if(name==='cerca_derecho_esferico'){
                p.adicion_derecho = nuevo_valor + parseFloat(p.lejos_derecho_esferico)
            }
            if(name==='cerca_izquierdo_esferico'){
                p.adicion_izquierdo = nuevo_valor + parseFloat(p.lejos_izquierdo_esferico)
            }
            setParam(p) 
        }
        if(e.key==='ArrowDown'){
            let nuevo_valor = parseFloat(value) - 0.25
            p[name] = nuevo_valor
            if(name==='cerca_derecho_esferico'){
                p.adicion_derecho = nuevo_valor + parseFloat(p.lejos_derecho_esferico)
            }
            if(name==='cerca_izquierdo_esferico'){
                p.adicion_izquierdo = nuevo_valor + parseFloat(p.lejos_izquierdo_esferico)
            }
            setParam(p) 
        }
    }



    const close = ()=>{ setDialogs({...dialogs,edit_receta:false});  }
    const setearValores = useCallback(()=>{
        if(dialogs.edit_receta){
            let f = {...factura}
            if(idUpdate.state){
                if(f.receta.codigo_derecho===f.receta.codigo_izquierdo){
                    setParam(f.receta)
                }
            }
            else{
                //setParam(f.items[selectIndex].receta)
            }
        }
    },[dialogs,factura,idUpdate])
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {setearValores();}
        return () => {isActive = false; ca.abort();};
      }, [setearValores]);

    return ( <Dialog open={dialogs.edit_receta} fullWidth maxWidth="lg" onClose={close} >
    <DialogTitle><ButtonTip onClick={close} title='Cerrar' icon='close' /> Editar receta:  {selectProduct?.codigo} - { selectProduct?.descripcion}  </DialogTitle>
    <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="overline" color='WindowFrame'>{ selectProduct?.lado}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                    <Grid item xs={12}><Typography variant="button">LEJOS</Typography></Grid>
                    <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO:</Typography></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'} onKeyUp={key} autoFocus  name="lejos_derecho_esferico" onChange={change} value={param.lejos_derecho_esferico} fullWidth label='Esférico' /> </Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'} onKeyUp={key} name="lejos_derecho_cilindrico" onChange={change} value={param.lejos_derecho_cilindrico}  label='Cilindrico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'}  name="lejos_eje_derecho" onChange={change} value={param.lejos_eje_derecho}  label='Eje' /></Grid>
                    <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO:</Typography></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'} onKeyUp={key}  name="lejos_izquierdo_esferico" onChange={change} value={param.lejos_izquierdo_esferico} fullWidth label='Esférico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'} onKeyUp={key}  name="lejos_izquierdo_cilindrico" onChange={change} value={param.lejos_izquierdo_cilindrico}  label='Cilindrico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'}  name="lejos_eje_izquierdo" onChange={change} value={param.lejos_eje_izquierdo}  label='Eje' /></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                    <Grid item xs={12}><Typography variant="button">CERCA</Typography></Grid>
                    <Grid item xs={12} sm={3}><Typography variant="overline">DERECHO</Typography></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'} onKeyUp={key} name="cerca_derecho_esferico" onChange={change} value={param.cerca_derecho_esferico} fullWidth label='Esférico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'} onKeyUp={key} name="cerca_derecho_cilindrico" onChange={change} value={param.cerca_derecho_cilindrico}   label='Cilindrico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='izquierdo'}  name="cerca_eje_derecho" onChange={change} value={param.cerca_eje_derecho}  label='Eje' /></Grid>
                    <Grid item xs={12} sm={3}><Typography variant="overline">IZQUIERDO</Typography></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'} onKeyUp={key}  name="cerca_izquierdo_esferico" onChange={change} value={param.cerca_izquierdo_esferico}  fullWidth label='Esférico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'} onKeyUp={key}  name="cerca_izquierdo_cilindrico" onChange={change} value={param.cerca_izquierdo_cilindrico}   label='Cilindrico' /></Grid>
                    <Grid item xs={12} sm={3}><InputNumerico disabled={selectProduct.lado==='derecho'} name="cerca_eje_izquierdo" onChange={change} value={param.cerca_eje_izquierdo}  label='Eje' /></Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                    <Grid item xs={12} sm={12}><Typography variant="overline">ADICION</Typography></Grid>
                    <Grid item xs={12} sm={6}><InputNumerico disabled={selectProduct.lado==='izquierdo'} onKeyUp={key} name="adicion_derecho" onChange={change} value={param.adicion_derecho} fullWidth label='Derecho' /></Grid>
                    <Grid item xs={12} sm={6}><InputNumerico disabled={selectProduct.lado==='derecho'} onKeyUp={key} name="adicion_izquierdo" onChange={change} value={param.adicion_izquierdo} fullWidth label='Izquierdo' /></Grid>
                    
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container alignItems='center' spacing={1} sx={{ border:'1px solid silver',padding:1,borderRadius:1 }}>
                    <Grid item xs={12} sm={4}><Typography variant="button">DNP</Typography></Grid>
                    <Grid item xs={12} sm={4}><InputNumerico disabled={selectProduct.lado==='izquierdo'} name="dnp_derecho" onChange={change} value={param.dnp_derecho} fullWidth label='DNP DERECHO' /> </Grid>
                    <Grid item xs={12} sm={4}><InputNumerico disabled={selectProduct.lado==='derecho'} name="dnp_izquierdo" onChange={change} value={param.dnp_izquierdo} fullWidth label='DNP IZQUIERDO' /> </Grid>
                    <Grid item xs={12} sm={4}><Typography variant="button">ALTURA</Typography></Grid>
                    <Grid item xs={12} sm={4}><InputNumerico disabled={selectProduct.lado==='izquierdo'} name="altura_derecho" onChange={change} value={param.altura_derecho} fullWidth label='Altura derecha' /> </Grid>
                    <Grid item xs={12} sm={4}><InputNumerico disabled={selectProduct.lado==='derecho'} name="altura_izquierdo" onChange={change} value={param.altura_izquierdo} fullWidth label='Altura izquierda' /> </Grid>
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
        <Button variant="contained" onClick={insertarReceta}>EDITAR</Button>
        <Button variant="outlined" onClick={close}>CERRAR</Button>
    </DialogActions>
</Dialog>  );
}

export default EditReceta;
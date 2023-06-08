import { Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete,TextField, Button, Icon, LinearProgress, Stack, Checkbox, Alert, IconButton } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";
import { APICALLER } from "../../../Services/api";
import { useState,useEffect } from "react";
import useInitialState from "./useInitialState";
import { useAuth } from "../../../Providers/AuthProvider";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";
import ListadoAgregado from "./ListadoAgregado";
import { funciones } from "../../../App/helpers/funciones";
import BuscarCliente from "./Components/BuscarCliente";
import ConsultarProducto from "./Components/ConsultarProducto";
import PreciosDescuentos from "./Components/PreciosDescuentos";

function Agregar() {
    const {userData}  = useAuth()
    const {token_user} = userData
    const {iError,iForm} = useInitialState()
    const {dialogs,setDialogs} = useDescuentos()
    const [selectCliente,setSelectCliente] = useState(null)
    const [expand,setExpand] = useState(false)
    const [selectProduct,setSelectProduct] = useState(null)
    const [errors,setErrors] = useState(iError)
    const [form,setForm] = useState(iForm)
    const close = ()=>{
        setDialogs({...dialogs,add:false})
        reset()
    }
    const reset = ()=>{
        setSelectProduct(null)
        setSelectCliente(null)
        setForm(iForm)
        setErrors(iError)
    }

    const enviar = async()=>{
        setLoading(true)
        let descuento = {
            cliente_id_descuento:selectCliente.id_cliente,
            producto_id_descuento: selectProduct.id_producto,
            porcentaje_descuento: form.porcentaje
        }
        
        //let ins = await APICALLER.insert({table:'descuentos',data:descuento,token:token_user})
    }

    return ( <Dialog onClose={close} open={dialogs.add} maxWidth='md' fullWidth={!expand} fullScreen={expand} >
        <DialogTitle><IconButton onClick={close}><Icon>close</Icon></IconButton> Agregar descuento por cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <BuscarCliente setSelectCliente={setSelectCliente} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    {errors.active &&
                    <Alert icon={false} severity="error">
                        <p>{errors.msg}</p>
                    </Alert>
                    }
                    {selectProduct && <p>COD: {selectProduct.codigo_producto}</p>}
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        selectProduct && <p>Producto: {selectProduct.nombre_producto}</p>
                    }
                </Grid>
                <Grid item xs={12} sm={3}>
                    {
                        selectProduct && <p>PRECIO: {funciones.numberFormat(selectProduct.precio_producto)}</p>
                    }
                </Grid>
                {
                    selectCliente && 
                    <>
                        <Grid item xs={12} sm={4} >
                            <ConsultarProducto selectCliente={selectCliente}  setProduct={setSelectProduct} setErr={setErrors} />
                        </Grid>
                        <Grid item xs={12} sm={8} >
                            <PreciosDescuentos form={form} setForm={setForm} selectProduct={selectProduct} />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Stack direction='row' spacing={1}>
                                <Button disabled={selectProduct===null} onClick={enviar} variant="outlined">AGREGAR</Button>
                                <Button onClick={reset} variant="outlined">LIMPIAR</Button>
                            </Stack>
                            
                        </Grid>
                    </>
                }
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" startIcon={<Icon>{expand ? `close_fullscreen`: `open_in_full`}</Icon>} onClick={()=>{setExpand(!expand)}}> {expand ? `MINIZAR` : `EXPANDIR`} </Button>
            <Button variant="contained" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Agregar;
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete,TextField, Button, Icon, LinearProgress } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";
import { APICALLER } from "../../../Services/api";
import { useState,useEffect } from "react";
import useInitialState from "./useInitialState";
import { useAuth } from "../../../Providers/AuthProvider";

function Agregar() {
    const {userData}  = useAuth()
    const {token_user} = userData
    const {dialogs,setDialogs} = useDescuentos()
    const {iError,iProducto,iCliente} = useInitialState()
    const [lista,setLista]= useState([])
    const [loadingSearch,setLoadingSearch] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(iError)
    const [search,setSearch] = useState('')
    const [cliente,setCliente] = useState(iCliente)
    const [expand,setExpand] = useState(false)
    const [producto,setProducto] = useState(iProducto)
    const [form,setForm] = useState({
        codigo_producto:'',
        porcentaje_descuento:'',
    })
    const change = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const insertar = (e,val)=>{
        if(val && val.id_cliente){
            setCliente({...val})
        }
    }
    const consultar = async()=>{
        if(form.codigo_producto === ''){
            setError({active:true,code:1,message:'Falta código'})
            return false;
        }
        if(form.porcentaje_descuento === ''){
            setError({active:true,code:2,message:'Falta porcentaje'})
            return false;
        }
        setError(iError)
        setLoading(true)
        let res = await APICALLER.get({table:'productos',where:`codigo_producto,=,${form.codigo_producto}`})
        if(res.response){
            if(res.found>0){
                console.log(res.first);
                /* let ins = await APICALLER.insert({table:'descuentos',data:{},token:token_user})
                if(ins.response){
                    //let p = [...productos]
                    //p.push(nuevo)
                }else{ console.log(ins);} */
            }else{
                setError({active:true,code:1,message:'Producto no existente.'})
            }
        }else{
            console.log(res)
        }
        setLoading(false)
        document.getElementById('codigo_producto').focus();
    }
    const close = ()=>{
        setDialogs({...dialogs,add:false})
        setError(iError)
        setCliente(iCliente)
        setProducto(iProducto)
    }

   

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoadingSearch(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,fantasia_cliente',
                    filtersField:"nombre_cliente,ruc_cliente,fantasia_cliente",filtersSearch:search,pagesize:20
                })
                setLista(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])

    return ( <Dialog onClose={close} open={dialogs.add} maxWidth='md' fullWidth={!expand} fullScreen={expand} >
        <DialogTitle>Agregar descuento por cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} lg={3}>
                    <Autocomplete
                    autoComplete autoHighlight autoSelect  selectOnFocus
                    getOptionLabel={(option) => option.id_cliente+" - "+option.nombre_cliente+" - "+option.ruc_cliente }
                    options={lista}
                    onChange={insertar}
                    loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
                    renderInput={(params) => <TextField {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar cliente" />}
                />
                </Grid>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                    <TextField id='codigo_producto' size='small' name='codigo_producto' value={form.codigo_producto} onChange={change} fullWidth disabled={cliente.id_cliente===null}  label='Código de producto' helperText={error.code===1 && error.message} error={error.active && error.code===1} />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                    <TextField fullWidth size='small' name='porcentaje_descuento' value={form.porcentaje_descuento} onChange={change} label='Porcentaje %' helperText={error.code===2 && error.message} error={error.active && error.code===2} />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                    <Button size="large" onClick={consultar} color="success" startIcon={<Icon>add</Icon>} variant="outlined">Agregar</Button>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" startIcon={<Icon>{expand ? `close_fullscreen`: `open_in_full`}</Icon>} onClick={()=>{setExpand(!expand)}}> {expand ? `MINIZAR` : `EXPANDIR`} </Button>
            <Button variant="contained" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Agregar;
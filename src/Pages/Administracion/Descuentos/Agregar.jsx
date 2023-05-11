import { Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete,TextField, Button, Icon, LinearProgress } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";
import { APICALLER } from "../../../Services/api";
import { useState,useEffect } from "react";
import useInitialState from "./useInitialState";
import { useAuth } from "../../../Providers/AuthProvider";
import NumberFormatCustom from "../../../Components/TextFields/NumberFormatCustom";

function Agregar() {
    const {userData}  = useAuth()
    const {token_user} = userData
    const {dialogs,setDialogs} = useDescuentos()
    const {iError,iProducto,iCliente,iForm} = useInitialState()
    const [lista,setLista]= useState([])
    const [loadingSearch,setLoadingSearch] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(iError)
    const [search,setSearch] = useState('')
    const [cliente,setCliente] = useState(iCliente)
    const [expand,setExpand] = useState(false)
    const [productos,setProductos] = useState(iProducto)
    const [form,setForm] = useState(iForm)
    const change = e=>{
        const {value,name} = e.target
        setForm({...form,[name]:value})
    }
    const insertar = (e,val)=>{
        if(val && val.id_cliente){
            setCliente({...val})
            document.getElementById('codigo_producto').focus()
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
        if(parseFloat(form.porcentaje_descuento) > 100 || parseFloat(form.porcentaje_descuento) < 0){
            setError({active:true,code:2,message:'Rango erroneo entre 0 y 100'})
            return false;
        }
        setError(iError)
        setLoading(true)
        let res = await APICALLER.get({table:'productos',fields:'nombre_producto,codigo_producto,id_producto,precio_producto',where:`codigo_producto,=,${form.codigo_producto}`})
        if(res.response){
            if(res.found>0){
                let product_ = res.first 
                let data_new = {cliente_id_descuento: cliente.id_cliente,producto_id_descuento: product_.id_producto, porcentaje_descuento:form.porcentaje_descuento}
                let ins = await APICALLER.insert({table:'descuentos',data:data_new,token:token_user})
                if(ins.response){
                    let p = [...productos]
                    p.push({id_descuento:ins.last_id,nombre_producto:product_.nombre_producto,codigo_producto:product_.codigo_producto,porcentaje_descuento:form.porcentaje_descuento})
                    setProductos(p)
                    setForm(iForm)
                    document.getElementById('codigo_producto').focus()
                }else{ console.log(ins);}
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
        setProductos(iProducto)
        setForm(iForm)
    }

    const eliminar = async(id)=>{
        setLoading(true)
        let index = productos.findIndex(elem=> elem.id_descuento === id)

        let res = await APICALLER.delete({table:'descuentos',id:id,token:token_user})
        if(res.response){
            let p = [...productos]
            p.splice(index, 1);
            setProductos(p)
        }
        setLoading(false)
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
                <Grid item xs={12} >
                    <Autocomplete
                    
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
                <Grid item xs={12} sm={4} lg={4}>
                    <TextField id='codigo_producto' size='small' name='codigo_producto' value={form.codigo_producto} onChange={change} fullWidth disabled={cliente.id_cliente===null}  label='Código de producto' helperText={error.code===1 && error.message} error={error.active && error.code===1} />
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                    <TextField fullWidth size='small' 
                    InputProps={{
                        inputProps: { min: 0},
                        inputComponent: NumberFormatCustom,
                      }}
                    name='porcentaje_descuento' value={form.porcentaje_descuento} onChange={change} label='Porcentaje %' helperText={error.code===2 && error.message} error={error.active && error.code===2} />
                </Grid>
                <Grid item xs={12} sm={4} lg={4}>
                    <Button size="large" onClick={consultar} color="success" startIcon={<Icon>add</Icon>} variant="outlined">Agregar</Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    <table width='100%' >
                        <tbody>
                            <tr style={{ background:'black',color:'white' }}>
                                <th>COD.</th>
                                <th>PRODUCTO</th>
                                <th>PORCENTAJE</th>
                                <th>ACCION</th>
                            </tr>
                            {productos.map((e,i)=>(
                                <tr key={i}>
                                    <td>{e.codigo_producto}</td>
                                    <td>{e.nombre_producto}</td>
                                    <td>{e.porcentaje_descuento} %</td>
                                    <td><Button variant="outlined" color="error" startIcon={<Icon>delete_forever</Icon>} onClick={()=>{eliminar(e.id_descuento)}}>Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
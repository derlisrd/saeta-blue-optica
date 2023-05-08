import { Dialog, DialogActions, DialogContent, DialogTitle, Grid,Autocomplete,TextField, Button } from "@mui/material";
import { useDescuentos } from "./DescuentosProvider";
import { APICALLER } from "../../../Services/api";
import { useState,useEffect } from "react";
import useInitialState from "./useInitialState";

function Agregar() {
    const {dialogs,setDialogs} = useDescuentos()
    const {iError,iProducto,iCliente} = useInitialState()
    const [lista,setLista]= useState([])
    const [loadingSearch,setLoadingSearch] = useState(false)
    const [error,setError] = useState(iError)
    const [search,setSearch] = useState('')
    const [cliente,setCliente] = useState(iCliente)
    const [producto,setProducto] = useState(iProducto)
    const insertar = (e,val)=>{
        if(val && val.id_cliente){
            setCliente({...val})
        }
    }
    const consultar = async(txt)=>{
        let res = await APICALLER.get({table:'productos',where:`codigo_producto,=,${txt}`})
        if(res.response){
            if(res.found>0){

            }else{
                setError({active:true,code:1,message:'Producto no existente.'})
            }
        }else{
            console.log(res)
        }
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

    return ( <Dialog onClose={close} open={dialogs.add} fullWidth >
        <DialogTitle>Agregar descuento por cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                    autoComplete autoHighlight autoSelect  selectOnFocus
                    getOptionLabel={(option) => option.fantasia_cliente+" - "+option.nombre_cliente+" - "+option.ruc_cliente }
                    options={lista}
                    onChange={insertar}
                    loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
                    renderInput={(params) => <TextField {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar cliente" />}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField disabled={cliente.id_cliente===null} onKeyUp={e=>{e.key==='Enter'&&consultar(e.target.value)}} label='Código de producto' helperText={error.message} 
                    
                    error={error.active && error.code===1} />
                </Grid>
                <Grid item xs={12} sm={6}>

                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={close}>CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default Agregar;
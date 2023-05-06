import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,TextField } from "@mui/material";
import { usePedidos } from "./PedidosProvider";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../Services/api";

function DialogBuscarCliente() {

    const {setDialogs,dialogs,setearFactura,factura} = usePedidos()
    const [lista,setLista] = useState([])
    const [search,setSearch] = useState('')
    const [codigo,setCodigo] = useState('')
    const [loading,setLoading] = useState(false)
    const close = ()=>{ 
        setDialogs({...dialogs,buscar_cliente:false});
        setCodigo('')
        let new_fact = {...factura}
        new_fact.codigo_cliente_pedido = codigo
        setearFactura(new_fact)
    }
    const enterCodigo = e=>{
        if(e.key==="Enter"){
            setDialogs({...dialogs,buscar_cliente:false});
            let new_fact = {...factura}
            new_fact.codigo_cliente_pedido = codigo
            setearFactura(new_fact)
        }
    }
    const openRegistrar = ()=>{ setDialogs({...dialogs,buscar_cliente:false,registrar_cliente:true}) }

    const insertar = (e,val)=>{
        let new_fact = {...factura}
        new_fact.cliente = {
            id_cliente:val.id_cliente,
            ruc_cliente:val.ruc_cliente,
            nombre_cliente:val.nombre_cliente,
            direccion_cliente: val.direccion_cliente
        }
        setearFactura(new_fact)
    }
    
    
    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente',
                    filtersField:"nombre_cliente,ruc_cliente",filtersSearch:search,pagesize:20
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return ( <Dialog open={dialogs.buscar_cliente} fullWidth onClose={close} >
        <DialogTitle>Cliente</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField autoFocus fullWidth label='Codigo interno' onKeyUp={enterCodigo}  value={codigo} onChange={(e)=>{setCodigo(e.target.value)}} />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    autoComplete autoHighlight autoSelect  selectOnFocus
                    getOptionLabel={(option) => option.nombre_cliente+" - "+option.ruc_cliente }
                    options={lista}
                    onChange={insertar}
                    loadingText="Cargando..." loading={loading} noOptionsText="No existe en registro..."
                    renderInput={(params) => <TextField {...params} fullWidth onChange={e=>setSearch(e.target.value)} label="Buscar" />}
                />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={openRegistrar} variant="outlined" >REGISTRAR</Button>
            <Button onClick={close} variant="contained" >CERRAR</Button>
        </DialogActions>
    </Dialog> );
}

export default DialogBuscarCliente;
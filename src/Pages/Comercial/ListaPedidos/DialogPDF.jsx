import { Autocomplete, Button, Dialog, DialogActions, DialogContent,DialogTitle,Grid,Icon, IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import { useListaPedidos } from "./ListaPedidosProvider";
import { useEffect,useState,useRef} from "react";
import { APICALLER } from "../../../Services/api";
import DocumentoPDF from "./DocumentoPDF";
import { useReactToPrint } from 'react-to-print';

function DialogPDF() {

    const divRef = useRef(null);
    const {dialogs,setDialogs} = useListaPedidos()
    const [error,setError]=useState({code:0})
    const [desde,setDesde] = useState('')
    const [hasta,setHasta]= useState('')
    const [selectCliente,setSelectCliente]=useState(null)
    const [search,setSearch]= useState('')
    const [detalles,setDetalles] = useState({total:0,cliente:'',fecha_inicio:'',fecha_fin:''})
    const [listaCliente,setListaCliente]=useState([])
    const [loading,setLoading] = useState(false)
    const [lista,setLista]=useState([])
    const [loadingSearch,setLoadingSearch]=useState(false)
    const reset = ()=>{
        setLista([])
        setSelectCliente(null)
        setDetalles({total:0,cliente:'',fecha_inicio:'',fecha_fin:''})
        setSearch('')
    }
    const insertarCliente = (e,value)=>{
        setSelectCliente(value)

    }
    const filtrar = async()=>{
        if(desde===''){
            setError({code:1})
            return false;
        }
        if(hasta===''){
            setError({code:2})
            return false
        }
        setError({code:0})
        setLoading(true)
        let res = await APICALLER.get({table:'pedidos_items',include:'pedidos,productos',on:'pedido_id,id_pedido,id_producto,producto_id_item',
        fields:'precio_venta_item,id_pedido,cantidad_pedido,fecha_pedido,codigo_producto,nombre_producto',
        where:`cliente_id_pedido,=,${selectCliente.id_cliente}`
        })
        if(res.response)
        {   let total_venta = 0;
            res.results.forEach(elem => {
                total_venta += parseFloat(elem.precio_venta_item)
            });
            setDetalles({cliente:selectCliente.nombre_cliente,total:total_venta,fecha_inicio: desde,fecha_fin:hasta })
            setLista(res.results)
        }
        else
        {console.log(res.results);}
        setLoading(false)
    }

    
    const print = useReactToPrint({
        content: () => divRef.current,
      });

    const close = ()=>{
        setDialogs({...dialogs,pdf:false})
        reset()
    }



    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoadingSearch(true)
                let res = await APICALLER.get({
                    table: "clientes",
                    fields:'ruc_cliente,nombre_cliente,telefono_cliente,id_cliente,direccion_cliente,fantasia_cliente',
                    filtersField:'id_cliente,nombre_cliente,ruc_cliente,fantasia_cliente',
                    filtersSearch:search,pagesize:20
                })
                setListaCliente(res.results);
                setLoadingSearch(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Dialog fullScreen open={dialogs.pdf} onClose={close}>
            <DialogTitle> <IconButton onClick={close}><Icon>close</Icon></IconButton> Generar PDF por cliente</DialogTitle>
            <DialogContent>
                <Grid spacing={2} container>
                    <Grid item xs={12}>
                        {loading && <LinearProgress />}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <Autocomplete
                        autoComplete autoHighlight autoSelect  selectOnFocus
                        getOptionLabel={(o) => o.id_cliente+' '+o.nombre_cliente+' - '+o.fantasia_cliente+' '+o.ruc_cliente }
                        options={listaCliente}
                        onChange={insertarCliente}
                        loadingText="Cargando..." loading={loadingSearch} noOptionsText="No existe en registro..."
                        renderInput={(params) => <TextField {...params} fullWidth size="small" onChange={e=>setSearch(e.target.value)} label="Buscar por codigo, ruc o nombre" />}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                       <Stack direction='row' spacing={1}>
                            <TextField type="date" disabled={selectCliente===null} fullWidth size="small" error={error.code===1} onChange={e=>{setDesde(e.target.value)}} helperText='Fecha desde' />
                            <TextField type="date" disabled={selectCliente===null} fullWidth size="small" error={error.code===2} onChange={e=>{setHasta(e.target.value)}} helperText='Fecha hasta' />
                       </Stack>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Stack direction='row' spacing={1}>
                        <Button onClick={filtrar} disabled={selectCliente===null} variant="outlined">Filtrar</Button>
                        <Button onClick={reset} variant="outlined">Reiniciar</Button>
                        </Stack>
                    </Grid>
                </Grid>
                {
                    lista.length>0 && 
                    <div ref={divRef}><DocumentoPDF lista={lista} detalles={detalles} desde={desde} hasta={hasta} selectCliente={selectCliente} /></div>
                    
                }
            </DialogContent>
        <DialogActions>  
            {
                lista.length > 0 &&
                <Button startIcon={<Icon>picture_as_pdf</Icon>} onClick={print} variant="contained">BAJAR PDF</Button>

            }
            <Button onClick={close}>
                CERRAR
            </Button>
        </DialogActions>
    </Dialog> );
}

export default DialogPDF;
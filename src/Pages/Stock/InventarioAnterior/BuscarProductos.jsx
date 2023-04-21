
import { Autocomplete, Grid, LinearProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import TableStock from "./TableStock";
import AddStock from "./AddStock";
import { useInventario } from "./InventarioProvider";

function BuscarProductos() {

    const {stock,setStock,formInfo,setFormInfo} = useInventario()
    const [search,setSearch] = useState('')
    const [lista,setLista] = useState([])
    const [loading,setLoading] = useState(false)
    const [cargando,setCargando] = useState(false)

    const insertar = async(e,val)=>{
        let id = val?.id_producto
        if(id){
            setCargando(true)
        let res = await APICALLER.get({table:'productos_depositos',include:'depositos',on:'deposito_id,id_deposito',where:`producto_id,=,${id}`})
          if(res.response){
            setStock(res.results);
            setFormInfo(val);
          }else{console.log(res)}
        setCargando(false)
        }else{
            setLista([])
            setFormInfo({})
        }
    }

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "productos",
                    fields:'codigo_producto,id_producto,nombre_producto,preciom_producto,precio_producto,tipo_producto,iva_producto',
                    filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20',
                    where:`tipo_producto,=,1`
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            {cargando && <LinearProgress />}
        </Grid>
        <Grid item xs={12}>
            <Autocomplete
                autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
                getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
                options={lista}
                onChange={insertar}
                loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
                renderInput={(params) => <TextField {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
            />
        </Grid>
        {
            formInfo.id_producto &&
            <Fragment>
                <Grid item xs={12}>
                    <AddStock />
                </Grid>
                <Grid item xs={12}>
                    <TableStock />
                </Grid>
            </Fragment>
        }
    </Grid>);
}

export default BuscarProductos;
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { usePedidos } from "./PedidosProvider";




function InputCodigo() {

    const {factura,setearFactura} = usePedidos()
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    const [lista,setLista] = useState([])
    
    const insertaProducto = (e,val)=>{
        if(val){
            let new_fact = {...factura}
            let nuevo_item = {
                cantidad:1,
                precio: parseFloat(val.precio_producto),
                preciom: parseFloat(val.precio_producto),
                descripcion:val.nombre_producto,
                id_producto:val.id_producto,
                codigo:val.codigo_producto
            }
        new_fact.items.push(nuevo_item)
        setearFactura(new_fact)
        }
        setSearch('')
        setLista([])
    }

    useEffect(()=>{
        const timer = setTimeout(async()=>{
            if(search!==''){
                setLoading(true)
                let res = await APICALLER.get({
                    table: "productos",
                    fields:'codigo_producto,id_producto,nombre_producto,preciom_producto,precio_producto',
                    filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20'
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Autocomplete
        autoComplete autoHighlight autoSelect clearOnEscape
        getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
        options={lista}
        onChange={insertaProducto}
        loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
        renderInput={(params) => <TextField {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
      />);
}

export default InputCodigo;
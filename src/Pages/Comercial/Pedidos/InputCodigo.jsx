import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { usePedidos } from "./PedidosProvider";




function InputCodigo() {

    const {factura,setearFactura,dialogs,setDialogs,setFormDepositoStock} = usePedidos()
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    const [lista,setLista] = useState([])
    
    const insertaProducto = async(e,val)=>{
        if(val){
            let new_fact = {...factura}
            let tipo =  parseInt(val.tipo_producto), id_producto = val.id_producto
            let index = new_fact.items.findIndex(e => e.codigo.toLowerCase() === val.codigo_producto.toLowerCase());
            let found = new_fact.items.filter(i => i.codigo.toLowerCase() === val.codigo_producto.toLowerCase());
            
            if(tipo === 1){
                let res = await APICALLER.get({table:'productos_depositos',where:`producto_id,=,${id_producto}`})
                if(res.response){
                    setFormDepositoStock(res.results)
                }else{ console.log(res);}
                setDialogs({...dialogs,select_deposito_stock:true})
            }

            if (found.length > 0) {
                new_fact.items[index].cantidad += 1 
            }else{
                let nuevo_item = {
                    cantidad:1,
                    precio: parseFloat(val.precio_producto),
                    preciom: parseFloat(val.precio_producto),
                    descripcion:val.nombre_producto,
                    id_producto,
                    codigo:val.codigo_producto,
                    tipo,
                    iva:parseFloat(val.precio_producto)                    
                }
                new_fact.items.push(nuevo_item)
            }
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
                    fields:'codigo_producto,id_producto,nombre_producto,preciom_producto,precio_producto,tipo_producto,iva_producto',
                    filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20'
                })
                setLista(res.results);
                setLoading(false)
            }
        },600)

        return ()=> clearTimeout(timer)
    },[search])


    return (<Autocomplete
        autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
        getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
        options={lista}
        onChange={insertaProducto}
        loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
        renderInput={(params) => <TextField {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
      />);
}

export default InputCodigo;
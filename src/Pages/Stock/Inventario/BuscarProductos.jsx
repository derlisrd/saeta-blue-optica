
import { Autocomplete, Grid, LinearProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import TableStock from "./TableStock";

import { useInventario } from "./InventarioProvider";
import SelectDeposito from "./SelectDepositos";

function BuscarProductos() {

    const {setStock,formInfo,setFormInfo,setRangos,depositos} = useInventario()
    const [search,setSearch] = useState('')
    const [depositoID,setDepositoID] = useState('')
    const [lista,setLista] = useState([])
    const [loading,setLoading] = useState(false)
    const [cargando,setCargando] = useState(false)

    const insertar = async(e,val)=>{
        let id = val?.id_producto
        if(id){
            setCargando(true)
            let res = await APICALLER.get({table:'productos_depositos',include:'depositos',on:'deposito_id,id_deposito',where:`producto_id,=,${id},and,deposito_id,=,${depositoID}`})
          if(res.response){
            
            //setStock(res.results);
            
            let min_esferico = parseFloat(val.min_esferico), 
                max_esferico = parseFloat(val.max_esferico),
                min_cilindrico = parseFloat(val.min_cilindrico), 
                max_cilindrico = parseFloat(val.max_cilindrico),
                new_rangos_esferico = [], new_rangos_cilindrico=[]
                
                while (min_esferico <= max_esferico) {
                    new_rangos_esferico.push(max_esferico.toFixed(2).toString())
                    max_esferico -= 0.25
                }
                
                
                while (max_cilindrico >= min_cilindrico) {
                    new_rangos_cilindrico.push(max_cilindrico.toFixed(2).toString())
                    max_cilindrico -= 0.25
                }
                
                setRangos({esferico:new_rangos_esferico,cilindrico:new_rangos_cilindrico})
                let found,new_stock = []

                new_rangos_esferico.forEach(RE=>{
                    let cil = []
                    let total= 0;
                    new_rangos_cilindrico.forEach(RC=>{
                        found = res.results.find(ele => ele.graduacion_esferico === RE && ele.graduacion_cilindrico===RC);
                        if(found){
                            total += parseFloat(found.stock_producto_deposito)
                            cil.push({
                                edit:false,
                                stock: found.stock_producto_deposito,
                                cilindrico:RC,producto_id:id,
                                id_productos_deposito:found.id_productos_deposito,
                                deposito_id:depositoID})
                        }else{
                            cil.push({
                                edit:false,
                                stock: '0',
                                cilindrico:RC,
                                producto_id:id,id_productos_deposito:null,
                                deposito_id:depositoID
                            })
                        }        
                     })
                     new_stock.push({esferico: RE, cilindrico: cil,total })
                })
                //console.log(new_stock);
                setStock(new_stock);
            setFormInfo(val);
          }else{console.log(res)}
            setCargando(false)
        }else{
            setFormInfo({})
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
                    fields:'codigo_producto,id_producto,nombre_producto,preciom_producto,precio_producto,tipo_producto,iva_producto,min_esferico,max_esferico,min_cilindrico,max_cilindrico',
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
        <Grid item xs={12} sm={8}>
            <Autocomplete
                autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus
                getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
                options={lista}
                disabled={depositoID===''}
                onChange={insertar}
                loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
                renderInput={(params) => <TextField  {...params} onChange={e=>setSearch(e.target.value)} label="Buscar producto" />}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <SelectDeposito opciones={depositos} name='deposito_id' value={depositoID} onChange={e=>{setDepositoID(e.target.value)}} />
        </Grid>
        {
            formInfo.id_producto &&
            <Fragment>
                <Grid item xs={12}>
                    <TableStock />
                </Grid>
            </Fragment>
        }
    </Grid>);
}

export default BuscarProductos;
import { createContext, useCallback,useContext, useEffect, useState } from "react"
import { funciones } from "../../../../App/helpers/funciones"
import { APICALLER } from "../../../../Services/api"

const ListaFacturaContext = createContext()

function ListaFacturaProvider({children}) {
    const [dialogs,setDialogs] = useState({imprimir:false,entregar:false,cancelar:false,cambio_estado:false})
    const [loading,setLoading] = useState(true)
    const [formSelect,setFormSelect] = useState({})
    const [fechas,setFechas] = useState({
        desde: funciones.fechaActualYMD() + ' 00:00:00',
        hasta:funciones.fechaActualYMD() + ' 23:59:59'
    })
    const [listas,setListas] = useState({
        facturas:[],
        total: 0
    })


    const getLista = useCallback(async(searchTxt='',cliente='')=>{
        setLoading(true)
        let whereFilter = `fecha_factura,between,'${fechas.desde}',and,'${fechas.hasta}'`
        if(searchTxt!==''){
            whereFilter = `nro_factura,=,${searchTxt}`
        }
        if(cliente!==''){
            whereFilter=''
        }
        //console.log(whereFilter);
        let [res,totales] = await Promise.all([APICALLER.get({table:'facturas',include:'clientes,users',
        on:'cliente_id,id_cliente,id_user,user_id',
        fields:'id_factura,nro_factura,nombre_cliente,ruc_cliente,tipo_factura,total_factura,nombre_user,fecha_factura,tipo_factura,factura_pagado',
        where:whereFilter,
        filtersSearch:`${cliente}`,
        filtersField:'ruc_cliente,nombre_cliente',
        sort:'id_factura'
        }),
        APICALLER.get({table:'facturas',where:`fecha_factura,between,'${fechas.desde}',and,'${fechas.hasta}'`,fields:'SUM(total_factura) as monto_total'})
        ])
        if(res.response){

            setListas({facturas:res.results,total: totales.first.monto_total })
        }else{
            console.log(res);
        }

        setLoading(false)
    },[fechas])

    
    
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);
    const values = {listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista}

    return <ListaFacturaContext.Provider value={values}>{children}</ListaFacturaContext.Provider>
}

export function useListaFactura (){
    const {listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista} = useContext(ListaFacturaContext)
    return {listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista}
}


export default ListaFacturaProvider;
import { createContext, useCallback,useContext, useEffect, useState } from "react"
import { funciones } from "../../../../App/helpers/funciones"
import { APICALLER } from "../../../../Services/api"

const ListaFacturaContext = createContext()

function ListaFacturaProvider({children}) {
    const [dialogs,setDialogs] = useState({print:false,estado:false,pago:false, anular:false,reportes:false})
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
        let busca_cliente = cliente;
        let filterField = 'ruc_cliente,nombre_cliente';

        if(searchTxt!==''){
            //whereFilter = `nro_factura,LIKE,'%${searchTxt}%'`
            busca_cliente = searchTxt
            filterField = 'nro_factura'
            whereFilter=''
        }
        if(cliente!==''){
            whereFilter=''
        }
        //console.log(whereFilter);
        let [res,totales] = await Promise.all([APICALLER.get({table:'facturas',include:'clientes,users',
        on:'cliente_id,id_cliente,id_user,user_id',
        fields:'estado_factura,id_factura,nro_factura,nombre_cliente,ruc_cliente,tipo_factura,total_factura,nombre_user,fecha_factura,tipo_factura,factura_pagado',
        where:whereFilter,
        filtersSearch:`${busca_cliente}`,
        filtersField:filterField,
        sort:'id_factura'
        }),
        APICALLER.get({table:'facturas',where:`fecha_factura,between,'${fechas.desde}',and,'${fechas.hasta}'`,fields:'SUM(total_factura) as monto_total'})
        ])
        if(res.response){
            let facturas = []
            res.results.forEach(elem=>{
                let condicion = elem.tipo_factura === '1' ? 'Contado' : 'Credito'

                facturas.push({...elem,condicion,total_factura : parseFloat(elem.total_factura)})
            })
            setListas({facturas,total: totales.first.monto_total })
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
import { createContext, useCallback,useContext, useEffect, useState } from "react"
import { APICALLER } from "../../../Services/api"
import { funciones } from "../../../App/helpers/funciones"

const ListaPedidosContext = createContext()


function ListaPedidosProvider({children}) {

    
    const [dialogs,setDialogs] = useState({imprimir:false,editar_pedido:false,cancelar:false,cambio_estado:false})
    const [loading,setLoading] = useState(true)
    const [formSelect,setFormSelect] = useState({})
    const [fechas,setFechas] = useState({
        desde: funciones.fechaActualYMD() + ' 00:00:00',
        hasta:funciones.fechaActualYMD() + ' 23:59:59'
    })
    const [listas,setListas] = useState({
        pedidos:[],
        total:0,
        entrada:0
    })

    //console.log(fechas);

    const getLista = useCallback(async(searchTxt='',cliente='')=>{
        setLoading(true)
        let whereFilter = `fecha_pedido,between,'${fechas.desde}',and,'${fechas.hasta}'`
        
        if(searchTxt!==''){
            whereFilter = `id_pedido,=,${searchTxt}`
        }
        if(cliente!==''){
            whereFilter=''
        }
        //console.log(whereFilter);
        let [res,tot] = await Promise.all([APICALLER.get({table:'pedidos',include:'clientes,users',
        on:'cliente_id_pedido,id_cliente,id_user,user_id_pedido',
        fields:'codigo_cliente_pedido,facturado_pedido,motivo_cancela,estado_pago,total_pedido,tipo_pedido,total_pedido,nombre_user,fecha_pedido,id_pedido,nombre_cliente,estado_pedido,codigo_cliente_pedido',
        where:whereFilter,
        filtersSearch:`${cliente}`,
        filtersField:'ruc_cliente,nombre_cliente',
        sort:'id_pedido'
        }),
        APICALLER.get({table:'pedidos',where:`fecha_pedido,between,'${fechas.desde}',and,'${fechas.hasta}'`,fields:'SUM(total_pedido) as monto_total'})
        ])
        if(res.response){
            let tipoPedido = {'1':'Venta','2':'CORTESIA','3':'GARANTIA'}
            let pedidos = []
            res.results.forEach(elem=>{
                pedidos.push({...elem,total_pedido: parseFloat(elem.total_pedido), 
                    facturado: elem.facturado_pedido==='0'? 'No' : 'Si',
                    tipo: tipoPedido[elem.tipo_pedido]
                })
            })
            setListas({pedidos,entrada:tot.first.monto_total,total:res.found})
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

    return ( <ListaPedidosContext.Provider value={values}>{children}</ListaPedidosContext.Provider> );
}

export default ListaPedidosProvider;


export const useListaPedidos = ()=>{
    const {listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista} = useContext(ListaPedidosContext)
    return {listas,loading,dialogs,setDialogs,formSelect,setFormSelect,setFechas,getLista}
}
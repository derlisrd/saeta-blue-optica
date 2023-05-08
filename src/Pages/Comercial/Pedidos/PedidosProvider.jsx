import { createContext, useCallback, useContext,useEffect,useState } from "react";
import useInitialStates from "./useInitialStates";
import { useAuth } from "../../../Providers/AuthProvider";
import useQuery from "../../../Hooks/useQuery";
import { APICALLER } from "../../../Services/api";



const PedidosContext = createContext()




function PedidosProvider({children}) {
    const {initialFactura} = useInitialStates()
    let query = useQuery();

    

    const [idUpdate,setIdUpdate] = useState({
        state:false,
        id: null
    })
    const [dialogs,setDialogs] = useState({
        main: query.get("open") ? true : false ,
        finalizar:false,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false,
        obs:false,
        precio:false
    })
    const {userData} = useAuth()
    const {token_user} = userData
    const [cargas,setCargas] = useState({
        main:false,
        stock:false
    })
    const [selectProduct, setSelectProduct] = useState({})
    const [formDepositoStock,setFormDepositoStock] = useState([])
    const [seleccionado,setSeleccionado] = useState([])
    const [factura,setFactura] = useState(()=>{
        let sto = JSON.parse(localStorage.getItem('pedido'))
        return sto ?? initialFactura
    })
    const [indexCambioPrecio,setIndexCambioPrecio] = useState(-1)
    const [lastID,setLastID] = useState('')
    
    const setearFactura = (obj)=>{
        let total = 0,iva5=0,iva10=0,exenta=0;
        
        obj.items.forEach(e=>{
            if(e.tipo<3){
                total += e.cantidad * e.precio
                exenta += e.iva === 0 && (e.cantidad * e.precio)
                iva5 += e.iva === 5 && (e.cantidad * e.precio)
                iva10 += e.iva === 10 && (e.cantidad * e.precio)
            }
        })
        obj.total = total;
        obj.iva10 = iva10;
        obj.iva5 = iva5;
        obj.exenta = exenta;
        setFactura(obj)
        localStorage.setItem('pedido',JSON.stringify(obj))
    }


    const getDatasEdit = useCallback(async()=>{
        let id = query.get('id')
        if(id){
            let [main,items] = await Promise.all([
                APICALLER.get({
                    table:'pedidos',where:`id_pedido,=,${id}`,
                    include:'clientes,users',on:'id_cliente,cliente_id_pedido,user_id_pedido,id_user',
                    fields:'nombre_cliente,ruc_cliente,direccion_cliente,nombre_user,fecha_pedido,codigo_cliente_pedido,obs_laboratorio,armazon_id,tipo_pedido'
            }),
            APICALLER.get({table:'pedidos_items',
            where:`pedido_id,=,${id}`,
            include:'productos',on:'id_producto,producto_id_item',
            fields:'deposito_id_item,codigo_producto,cantidad_pedido,id_producto,precio_producto,preciom_producto,precio_venta_item,iva_producto,nombre_producto'
            })
            ])
            if(main.response && items.response){
                setIdUpdate({state:true,id:id})
                let f = {...factura}
                let objeto = {
                    id_productos_deposito:null,
                    cantidad:2,
                    precio_normal:parseFloat(val.precio_producto),
                    precio: parseFloat(val.precio_producto),
                    preciom: parseFloat(val.preciom_producto),
                    descripcion:val.nombre_producto,
                    id_producto,
                    codigo:val.codigo_producto,
                    tipo,
                    iva:parseInt(val.iva_producto)
                }


            }
            console.log(main,items);
        }
    },[])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatasEdit();}
        return () => {isActive = false; ca.abort();};
      }, [getDatasEdit]);

    const values = {idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user} = useContext(PedidosContext)
    return {idUpdate,lastID,setLastID,indexCambioPrecio,setIndexCambioPrecio,dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas,selectProduct, setSelectProduct,token_user}
}

export default PedidosProvider;
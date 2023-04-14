import { createContext, useContext,useState } from "react";
import useInitialStates from "./useInitialStates";

const PedidosContext = createContext()

function PedidosProvider({children}) {
    const {iDialogs} = useInitialStates()
    const [dialogs,setDialogs] = useState(iDialogs)

    const initialFactura = {
        items:[],
        total:0,
        cliente:{
            id_cliente:1,
            ruc_cliente:'X',
            nombre_cliente:'SIN NOMBRE'
        }
    }
    const [cargas,setCargas] = useState({
        main:false,
        stock:false
    })
    const [formDepositoStock,setFormDepositoStock] = useState([])
    const [seleccionado,setSeleccionado] = useState([])
    const [factura,setFactura] = useState(initialFactura)


    const setearFactura = (obj)=>{
        let total = 0;
        obj.items.forEach(e=>{
            total += e.cantidad * e.precio
        })
        obj.total = total;
        setFactura(obj)
        console.log(obj);
    }

    const values = {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas} = useContext(PedidosContext)
    return {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas}
}

export default PedidosProvider;
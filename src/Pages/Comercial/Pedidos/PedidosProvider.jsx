import { createContext, useContext,useState } from "react";
import useInitialStates from "./useInitialStates";

const PedidosContext = createContext()

function PedidosProvider({children}) {
    const {iDialogs} = useInitialStates()
    
    const [dialogs,setDialogs] = useState(iDialogs)

    const initialFactura = {
        items:[],
        total:0
    }
    const [factura,setFactura] = useState(initialFactura)


    const setearFactura = (obj)=>{

        setFactura(obj)
    }

    const values = {dialogs,setDialogs,factura,setFactura,setearFactura}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {dialogs,setDialogs,factura,setFactura,setearFactura} = useContext(PedidosContext)
    return {dialogs,setDialogs,factura,setFactura,setearFactura}
}

export default PedidosProvider;
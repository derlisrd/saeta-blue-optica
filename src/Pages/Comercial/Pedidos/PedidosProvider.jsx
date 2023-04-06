import { createContext, useContext,useState } from "react";
import useInitialStates from "./useInitialStates";

const PedidosContext = createContext()

function PedidosProvider({children}) {
    const {iDialogs} = useInitialStates()
    
    const [dialogs,setDialogs] = useState(iDialogs)
    const initialFactura = {
        items:[{cantidad:0,precio:0,descripcion:'Producto'}]
    }
    const [factura,setFactura] = useState(initialFactura)

    const values = {dialogs,setDialogs,factura,setFactura}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {dialogs,setDialogs,factura,setFactura} = useContext(PedidosContext)
    return {dialogs,setDialogs,factura,setFactura}
}

export default PedidosProvider;
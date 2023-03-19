import { createContext, useContext,useState } from "react";
import useInitialStates from "./useInitialStates";

const PedidosContext = createContext()

function PedidosProvider({children}) {
    const {iDialogs} = useInitialStates()
    
    const [dialogs,setDialogs] = useState(iDialogs)

    const values = {dialogs,setDialogs}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {dialogs,setDialogs} = useContext(PedidosContext)
    return {dialogs,setDialogs}
}

export default PedidosProvider;
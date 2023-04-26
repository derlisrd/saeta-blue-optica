import { createContext, useContext, useState } from "react";
//import { useAuth } from "../../../Providers/AuthProvider";
import useInitialState from "./useInitialState";

const FacturasContext = createContext(null)

function FacturasProvider({children}) {

    //const {userData} = useAuth()
    const {iDialogs} = useInitialState()
    const [dialogs,setDialogs] = useState(iDialogs)

    const values = {dialogs,setDialogs}
    return <FacturasContext.Provider value={values}>{children}</FacturasContext.Provider>
}

export const useFacturas = ()=>{
    const {dialogs,setDialogs} = useContext(FacturasContext)
    return {dialogs,setDialogs}
}

export default FacturasProvider;
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useAuth } from "../../../Providers/AuthProvider";


const InventarioContext = createContext(null)


function InventarioProvider({children}) {

    const {userData} = useAuth()
    const {token_user} = userData
    const [depositos,setDepositos] = useState([])
    const [loadingLista,setLoadingLista] = useState(true)
    const [stock,setStock] = useState([])
    const [formInfo,setFormInfo] = useState({})
    const getLista = useCallback(async()=>{
        let res = await APICALLER.get({table:'depositos'})
        if(res.response){
            setDepositos(res.results)
        }
        else{
            console.log(res);
        }
        setLoadingLista(false)
    },[])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    const values = {
        depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo
    }

    return ( <InventarioContext.Provider value={values}>{children}</InventarioContext.Provider> );
}

export const useInventario = ()=>{
    const {depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo} = useContext(InventarioContext)
    return {depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo}
}


export default InventarioProvider; 
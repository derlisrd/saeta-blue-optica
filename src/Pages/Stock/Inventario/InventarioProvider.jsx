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
    const [rangos,setRangos] = useState({
        esferico:[],cilindrico:[]
    })
    const [dialogs,setDialogs] = useState({corregir:false})
    const [formSelect,setFormSelect] = useState({})
    const [formInfo,setFormInfo] = useState({})
    
    const getLista = useCallback(async()=>{
        let res = await APICALLER.get({table:'depositos'})
        if(res.response){
            setDepositos(res.results)
            console.log(res);
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
        depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo,rangos,setRangos,dialogs,setDialogs,formSelect,setFormSelect
    }

    

    return ( <InventarioContext.Provider value={values}>{children}</InventarioContext.Provider> );
}

export const useInventario = ()=>{
    const {depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo,rangos,setRangos,dialogs,setDialogs,formSelect,setFormSelect} = useContext(InventarioContext)
    return {depositos,loadingLista,stock,setStock,token_user,formInfo,setFormInfo,rangos,setRangos,dialogs,setDialogs,formSelect,setFormSelect}
}


export default InventarioProvider; 
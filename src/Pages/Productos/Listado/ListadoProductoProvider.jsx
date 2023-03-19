import { createContext, useContext,useState,useEffect,useCallback } from "react";
import { APICALLER } from "../../../Services/api";
const ListadoProductoContext = createContext()

function ListadoProductoProvider({children}) {

    const [lista,setLista] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    const getLista = useCallback(async()=>{
        setIsLoading(true)
        let res = await APICALLER.get({table:'productos'})
        if(res.response){
            setLista(res.results)
        }else{ console.log(res);}
        setIsLoading(false)
    },[])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);

    const values = {lista,isLoading}
    return <ListadoProductoContext.Provider value={values}>{children}</ListadoProductoContext.Provider>
}

export function useListadoProducto(){
    const {lista,isLoading} = useContext(ListadoProductoContext)
    return {lista,isLoading}
}

export default ListadoProductoProvider;
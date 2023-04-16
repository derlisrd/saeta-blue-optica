import { createContext, useContext,useState,useEffect,useCallback } from "react";
import { APICALLER } from "../../../../Services/api";
import useQuery from "../../../../Hooks/useQuery";
const ListadoProductoContext = createContext()

function ListadoProductoProvider({children}) {

    const [lista,setLista] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    let query = useQuery();
    let pageInitial = query.get('p') 
    const [currentPage,setCurrentPage] = useState( pageInitial ? parseInt(pageInitial) : 0 )
    const [pagination,setPagination] = useState({
      size: 60,
      total:0,
      found:0
    })

    const [dialogs,setDialogs] = useState({stock:false})
    const [formSelect,setFormSelect] = useState({
        id_producto:''
    })

    const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }


    const getLista = useCallback(async(searchTxt='')=>{
        setIsLoading(true)
        let actual_pagina = 0
        if(searchTxt===''){
        actual_pagina = currentPage;
        }
        let res = await APICALLER.get({table:'productos',
        filtersField:"nombre_producto,codigo_producto",
        filtersSearch:`${searchTxt}`,
        pagenumber:actual_pagina,pagesize:pagination.size
        })
        if(res.response){
            setLista(res.results)
            setPagination(pre=>{ return {...pre,total:res.total,found:res.found} })
        }else{ console.log(res);}
        setIsLoading(false)
    },[currentPage])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);

    const values = {lista,isLoading,getLista,currentPage,pagination,setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect}
    return <ListadoProductoContext.Provider value={values}>{children}</ListadoProductoContext.Provider>
}

export function useListadoProducto(){
    const {lista,isLoading,getLista,currentPage,pagination,setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect} = useContext(ListadoProductoContext)
    return {lista,isLoading,getLista,currentPage,pagination,setCurrentPage,dialogs,llaveDialog,formSelect,setFormSelect}
}

export default ListadoProductoProvider;
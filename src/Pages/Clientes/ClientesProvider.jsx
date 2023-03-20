import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../Services/api';

const ClientesContext = createContext()

const ClientesProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({})

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async()=>{
    setIsLoading(true)
    let res = await APICALLER.get({table:'clientes'})
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

  const values = {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
  return <ClientesContext.Provider value={values}>{children}</ClientesContext.Provider>
  
}

export function useClientes(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect} = useContext(ClientesContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect}
}

export default ClientesProvider

import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../../Services/api';

const ClientesContext = createContext()

const ClientesProvider = ({children}) => {
  
  const [lista,setLista] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_cliente:'',
    nombre_cliente:'',
    email_cliente:'',
    ruc_cliente:'',
    telefono_cliente:'',
    tipo_pago:''
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let config = {
      table: "clientes",
      fields: "ruc_cliente,nombre_cliente,id_cliente,email_cliente,telefono_cliente,tipo_pago",
      filtersField:"nombre_cliente,ruc_cliente",
      filtersSearch:`${searchTxt}`,
    };
    let res = await APICALLER.get(config)
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

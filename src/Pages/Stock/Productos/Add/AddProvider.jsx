import { createContext, useEffect, useContext,useState,useCallback } from "react";
import { APICALLER } from "../../../../Services/api"
import { useEnfocar } from "../../../../Hooks/useEnfocar";
import { useAuth } from "../../../../Providers/AuthProvider";

const AddContext = createContext()

const AddProvider = ({children})=>{

    const {userData} = useAuth()
    const [dialogs,setDialogs] = useState({main:true})
    const [listas,setListas] = useState({categorias:[],depositos:[]})
    const [isLoading,setIsLoading] = useState(true)
    const [isLoadingSend,setIsLoadingSend] = useState(false)
    const initialError = {active:false,code:0,message:''}
    const [error,setError] = useState(initialError)
    const [stock,setStock] = useState([])

    const enviar = async(e)=>{
        e.preventDefault();
        let formdata = new FormData(e.target)
        let datas =  Object.fromEntries(formdata)
        console.log(datas);
        if(datas.codigo_producto === ''){
          setError({active:true,code:5,message:'Codigo de producto'})
          useEnfocar('codigo_producto')
          return false
        }
        if(datas.nombre_producto === ''){
          setError({active:true,code:6,message:'Nombre de producto'})
          useEnfocar('nombre_producto')
          return false
        }
        if(datas.precio_producto === ''){
          setError({active:true,code:7,message:'Precio'})
          useEnfocar('precio_producto')
          return false
        }
        if(datas.preciom_producto === ''){
          setError({active:true,code:8,message:'Precio mayorista'})
          useEnfocar('preciom_producto')
          return false
        }
        if(!datas.tipo_producto){
          setError({active:true,code:9,message:'Tipo de producto'})
          return false
        }
        if(datas.id_categoria_producto === ''){
          setError({active:true,code:10,message:'Categoria'})
          return false
        }
        setError(initialError)
        setIsLoadingSend(true)
        let productoForm = {
          codigo_producto : datas.codigo_producto,
          id_categoria_producto: datas.id_categoria_producto,
          nombre_producto: datas.nombre_producto,
          precio_producto: datas.precio_producto,
          preciom_producto: datas.preciom_producto,
          tipo_producto : datas.tipo_producto
        }

        let res = await APICALLER.insert({table:'productos',data:productoForm,token:userData.token_user})
        if(res.response){
          console.log(res)
        }
        setIsLoadingSend(false)
        setDialogs({...dialogs,main:false})
    }

    
  
      const getLista = useCallback(async()=>{
        setIsLoading(true)
          let [cat,dep] = await Promise.all([APICALLER.get({
            table: "categorias",
            fields: "id_categoria,nombre_categoria,tipo_categoria"
          }),
          APICALLER.get({
            table: "depositos",
            fields: "id_deposito,nombre_deposito"
          })])
          if(cat.response && dep.response){
            setListas({
              categorias:cat.results,
              depositos: dep.results
            })
          }else{ console.log(cat,dep);}
        setIsLoading(false)
      },[])
      
      useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) {getLista();}
      return () => {isActive = false; ca.abort();};
      }, [getLista]);

    const values = {enviar,listas,isLoading,isLoadingSend,dialogs,setDialogs,error,stock,setStock}

    return <AddContext.Provider value={values}>{children}</AddContext.Provider>
}

export const useAdd = ()=>{
    const {enviar,listas,isLoading,isLoadingSend,dialogs,setDialogs,error,stock,setStock} = useContext(AddContext)
    return {enviar,listas,isLoading,isLoadingSend,dialogs,setDialogs,error,stock,setStock}
}

export default AddProvider
import { useState } from "react"

function useAdd() {
  

  const [stock,setStock] = useState([])
  const initialError = {
    active:false,
    code:0,
    message:''
  }
  const [isLoadingSend,setIsLoadingSend] = useState(false)
  const [error,setError] = useState(initialError)
  const initialForm = {
    id_categoria_producto:'',
    deposito_id:'',
    graduacion_esferico:'',
    graduacion_cilindrico:'',
    stock_producto_deposito:0,
    eje:0
  }
  const [form,setForm] = useState(initialForm)


  const change = e=>{
    const {value,name} = e.target
    setForm(prev=>({...prev,[name]:value}) )
  }
  
  const addStock = ()=>{
    let new_stock = [...stock]
    let eje = parseInt(form.eje), cil = form.graduacion_cilindrico, esf = form.graduacion_esferico, dep = form.deposito_id 
    if( eje<0 || eje>180 ){
      setError({code:1,active:true,message:'Eje incorrecto'})
      return false;
    }
    if(esf===''){
      setError({code:2,active:true,message:'Esferico'})
      return false;
    }
    if(cil===''){
      setError({code:3,active:true,message:'Cilindrico'})
      return false;
    }
    if(dep===''){
      setError({code:4,active:true,message:'Deposito'})
      return false;
    }
    setError(initialError)
    let insertar = {
      deposito_id: form.deposito_id,
      stock_producto_deposito: form.stock_producto_deposito,
      graduacion_cilindrico:form.graduacion_cilindrico,
      graduacion_esferico:form.graduacion_esferico,
      eje:form.eje
    }
    new_stock.push(insertar)
    setStock(new_stock)
    setForm(initialForm)
  }
    const enfocar = (id)=>{
      document.getElementById(id).focus()
    }

    const enviar = async(e)=>{
        e.preventDefault();
        let formdata = new FormData(e.target)
        let datas =  Object.fromEntries(formdata)
        console.log(datas);
        if(datas.codigo_producto === ''){
          setError({active:true,code:5,message:'Codigo de producto'})
          enfocar('codigo_producto')
          return false
        }
        if(datas.nombre_producto === ''){
          setError({active:true,code:6,message:'Nombre de producto'})
          enfocar('nombre_producto')
          return false
        }
        if(datas.precio_producto === ''){
          setError({active:true,code:7,message:'Precio'})
          enfocar('precio_producto')
          return false
        }
        if(datas.preciom_producto === ''){
          setError({active:true,code:8,message:'Precio mayorista'})
          enfocar('preciom_producto')
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
    }


    return {enviar,error,form,change,stock,addStock,isLoadingSend}

}

export default useAdd;
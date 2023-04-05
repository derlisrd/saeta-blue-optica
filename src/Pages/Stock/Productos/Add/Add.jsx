import { Box, Grid, LinearProgress, TextField,Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import InputPrecio from "./Components/InputPrecio";
import SelectCategory from "./Components/SelectCategory";
import Tipo from "./Components/Tipo";
import { useState } from "react";
import Stock from "./Components/Stock";
import AddStock from "./Components/AddStock";
import { useAdd } from "./AddProvider";


function Add() {

  const {dialogs,enviar,isLoading,isLoadingSend,error,listas,setStock,stock,setDialogs} = useAdd()
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
    setForm({...form,[name]:value})
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

  const close = ()=> setDialogs({...dialogs,main:false})

    return ( <Dialog open={dialogs.main} fullScreen onClose={()=>{}}>
    <DialogTitle>Agregar nuevo producto</DialogTitle>
    <form onSubmit={enviar}>
    <DialogContent>
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}> {(isLoading || isLoadingSend) && <LinearProgress />} </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField autoComplete="off" id="codigo_producto" error={error.code===5} name="codigo_producto" autoFocus label="Código" fullWidth />
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField autoComplete="off" id="nombre_producto" error={error.code===6} label="Nombre de producto"  name="nombre_producto" fullWidth />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
          <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <AddStock error={error} onChange={change} form={form} listas={listas} addStock={addStock} />
              </Grid>
              <Grid item sm={12} md={6}>
                <Stock stock={stock} />
              </Grid>
            </Grid>
          </Box> 
          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12} md={3}>
        <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputPrecio fullWidth error={error.code===7} label="Precio" id="precio_producto"  name="precio_producto"   />
            </Grid>
            <Grid item xs={12}>
              <InputPrecio fullWidth error={error.code===8} label="Precio Mayorista" id="preciom_producto"  name="preciom_producto"   />
            </Grid>
            <Grid item xs={12}>
              <Tipo name='tipo_producto' error={error}  />
            </Grid>
            <Grid item xs={12}>
              <SelectCategory error={error.code===10} onChange={change} value={form.id_categoria_producto} opciones={listas.categorias} name="id_categoria_producto" />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
    </DialogContent>
    <DialogActions>
      <Button size="large" onClick={close} variant="outlined">Cerrar</Button>
      <Button size="large" type='submit' variant="contained">Registrar</Button>
    </DialogActions>
    </form>
  </Dialog> );
}

export default Add;
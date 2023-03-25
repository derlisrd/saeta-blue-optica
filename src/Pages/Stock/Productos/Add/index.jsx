import { Box, Button, Grid, LinearProgress, TextField,Typography } from "@mui/material";
import { useState } from "react";
import RegistrarButton from "../../../../Components/Botones/RegistrarButton";
import NumberFormatCustom from '../../../../Components/TextFields/NumberFormatCustom'
import InputPrecio from "./Components/InputPrecio";
import SelectDeposito from "./Components/SelectDeposito";
import SelectCategory from "./Components/SelectCategory";
import { SelectCilindrico, SelectEsferico } from "./Components/SelectGraduaciones";
import Tipo from "./Components/Tipo";
import useGet from "./useGet";


function AddProducto() {

  const {isLoading,listas} = useGet()
  const [stock,setStock] = useState([])
  const initialForm = {
    'id_categoria_producto':'',
    'deposito_id':'',
    'graduacion_esferico':'',
    'graduacion_cilindrico':'',
    'stock_producto_deposito':'0'
  }
  const [form,setForm] = useState(initialForm)

  const change = e=>{
    const {value,name} = e.target
    setForm(prev=> {return {...prev,[name]:value}})
  }

  const addStock = ()=>{
    let new_stock = [...stock]
    let insertar = {
      deposito_id: form.deposito_id,
      stock_producto_deposito: form.stock_producto_deposito,
      graduacion_cilindrico:form.graduacion_cilindrico,
      graduacion_esferico:form.graduacion_esferico,
    }
    new_stock.push(insertar)
    setStock(new_stock)
    setForm(initialForm)
  }

  const submit = (e) => {
    e.preventDefault();
    let formdata = new FormData(e.target)
    let datas =  Object.fromEntries(formdata)
    console.log(datas);
  };


  if(isLoading){
    return <LinearProgress />
  }

  return (
    <form onSubmit={submit}>
      
      <h3>Agregar nuevo producto</h3>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField autoComplete="off" name="codigo_producto" autoFocus label="Código" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Nombre de producto" name="nombre_producto" fullWidth />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
              <Grid container spacing={2} alignItems="center" >
                <Grid item xs={12}>
                  <Typography>Stock</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                  <SelectDeposito name="deposito_id" value={form.deposito_id} onChange={change} opciones={listas.depositos} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                <SelectCilindrico onChange={change} value={form.graduacion_cilindrico} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                  <SelectEsferico onChange={change} value={form.graduacion_esferico} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                  <TextField autoComplete="off" InputProps={{inputComponent: NumberFormatCustom}} value={form.stock_producto_deposito} onChange={change} label="Cantidad" name="stock_producto_deposito" id="stock_producto_deposito" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                  <Button onClick={addStock} variant="outlined">Agregar</Button>
                </Grid>
              </Grid>
            </Box> 
            </Grid>

          

          </Grid>

        </Grid>
        <Grid item xs={12} md={4}>
          <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputPrecio fullWidth label="Precio" name="precio_producto"   />
              </Grid>
              <Grid item xs={12}>
                <InputPrecio fullWidth label="Precio Mayorista" name="preciom_producto"   />
              </Grid>
              <Grid item xs={12}>
                <Tipo name="tipo_producto" />
              </Grid>
              <Grid item xs={12}>
                <SelectCategory onChange={change} value={form.id_categoria_producto} opciones={listas.categorias} name="id_categoria_producto" />
              </Grid>
            </Grid>
          </Box>
          <Box paddingY={5} paddingX={2}>
            <RegistrarButton type="submit"  />
          </Box>
        </Grid>


      </Grid>
    </form>
  );
}

export default AddProducto;

import { Box, Grid, LinearProgress, TextField,Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import InputPrecio from "./Components/InputPrecio";
import SelectCategory from "./Components/SelectCategory";
import Tipo from "./Components/Tipo";
import useGet from "./useGet";
import Stock from "./Components/Stock";
import AddStock from "./Components/AddStock";
import useAdd from "./useAdd";


function AddProducto() {

  const {enviar,change,form,stock,error,addStock,isLoadingSend} = useAdd()
  const {isLoading,listas} = useGet()
  

  return (
    <Dialog open fullScreen onClose={()=>{}}>
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
        <Button size="large" variant="outlined">Cerrar</Button>
        <Button size="large" type='submit' variant="contained">Registrar</Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProducto;

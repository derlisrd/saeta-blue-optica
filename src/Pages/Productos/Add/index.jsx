import { Box, Grid, TextField } from "@mui/material";
import RegistrarButton from "../../../Components/Botones/RegistrarButton";

import InputPrecio from "./Components/InputPrecio";
import Tipo from "./Components/Tipo";


function AddProducto() {
  const submit = (e) => {
    e.preventDefault();
    log(e.target);
  };




  return (
    <Box>
      
      <h3>Agregar nuevo producto</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box boxShadow={12} borderRadius={3} paddingY={3} paddingX={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="off" autoFocus label="Código" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Nombre de producto" fullWidth />
              </Grid>
            </Grid>
          </Box>
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
            </Grid>
          </Box>
          <Box paddingY={5} paddingX={2}>
            <RegistrarButton  />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddProducto;

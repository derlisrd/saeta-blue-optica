import { Grid, Typography } from "@mui/material";
import BuscarProductos from "./BuscarProductos";
import InventarioProvider from "./InventarioProvider";
import Corregir from "./Corregir";

function Inventario() {
  return (
    <InventarioProvider>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Inventario</Typography>
          <Typography variant="caption">
            Módulo de correción de inventario
          </Typography>
        </Grid>
      </Grid>
      <Corregir />
      <BuscarProductos />
    </InventarioProvider>
  );
}

export default Inventario;

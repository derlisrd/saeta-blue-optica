import { Button, Stack } from "@mui/material";
import { useFacturas } from "./FacturasProvider";

function Botones() {
  const { setearFactura, initialFactura, factura, dialogs, setDialogs,setPedidos } =
    useFacturas();

  const cancelar = () => {
    setPedidos([])
    setearFactura(initialFactura);
  };
  const fin = () => setDialogs({ ...dialogs, finalizar: true });

  return (
    <Stack spacing={2}>
      {factura.items.length > 0 && (
        <>
          <Button
            size="large"
            onClick={fin}
            variant="contained"
            color="success"
            fullWidth
          >
            FINALIZAR
          </Button>
          <Button
            onClick={cancelar}
            size="large"
            variant="outlined"
            color="info"
            fullWidth
          >
            CANCELAR
          </Button>
        </>
      )}
    </Stack>
  );
}

export default Botones;

import { Button, MenuItem, Menu } from "@mui/material";
import { usePedidos } from "../PedidosProvider";
import { useState } from "react";

function SelectTipo() {
  const { factura, setearFactura } = usePedidos();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const change = (e) => {
    let f = { ...factura };
    f.tipo_pedido = e;
    setearFactura(f);
    setAnchorEl(null);
  }

  const tipos = {
    "1": "NORMAL PREESCRIPCIÓN",
    "2": "CORTESIA",
    "3": "GARANTIA",
    "4": "NORMAL SOLO CRISTAL"
  }

  return (
    <div>
      <Button onClick={handleOpen}  >
        TIPO PEDIDO: {tipos[factura.tipo_pedido] }
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            change("1");
          }}
          value="1"
        >
          NORMAL PREESCRIPCIÓN
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("2");
          }}
          value="2"
        >
          CORTESIA
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("3");
          }}
          value="3"
        >
          GARANTIA
        </MenuItem>
        <MenuItem
          onClick={() => {
            change("4");
          }}
          value="4"
        >
          NORMAL SOLO CRISTAL
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SelectTipo;

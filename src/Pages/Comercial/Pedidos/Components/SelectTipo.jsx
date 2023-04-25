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
  };

  return (
    <div>
      <Button onClick={handleOpen}  >
        TIPO PEDIDO: {factura.tipo_pedido ==='1' ? 'NORMAL' : factura.tipo_pedido==='2' ? 'CORTESIA' : 'GARANTIA' }
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            change("1");
          }}
          value="1"
        >
          NORMAL
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
          CORTESIA
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SelectTipo;

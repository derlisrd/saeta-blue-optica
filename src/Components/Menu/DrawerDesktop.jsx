import { Drawer } from "@mui/material";
import { env } from "../../app/config";
import MenuList from "./MenuList";

function DrawerDesktop() {
  const { DRAWER_WIDTH } = env;

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
          borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
        },
      }}
      open
    >
      <MenuList />
    </Drawer>
  );
}

export default DrawerDesktop;

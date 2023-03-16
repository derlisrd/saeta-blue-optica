import { Box, IconButton, Toolbar,Icon, Stack } from "@mui/material";
import { useMenu } from "./MenuProvider";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";

function ToolbarMain() {


  const {mobileOpen,setMobileOpen} = useMenu()
  const handleDrawerToggle = ()=>{ setMobileOpen(!mobileOpen) }

  return (
    <Stack direction='row'>
      <IconButton onClick={handleDrawerToggle} sx={{ minWidth:'56px' }}>
        <Icon>menu</Icon>
      </IconButton>
      <Toolbar
      component="div"
      sx={{ display: "flex", pr:2, width:'100%', bgcolor:'background.paper', justifyContent: "flex-end", alignItems: "center",boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <Stack direction='row' spacing={1} >
          <ThemeToggle />
          <ProfileMenu />
        </Stack>
    </Toolbar>
    </Stack>
  );
}

export default ToolbarMain;

import { Icon } from "@iconify/react";
import {  IconButton, Toolbar, Stack, Box } from "@mui/material";
import { env } from "../../app/config";
import { useMenu } from "./MenuProvider";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";


const Icono = ()=>( <Icon icon='mingcute:menu-fill' height={24} ></Icon>)

function ToolbarMain() {

  const {DRAWER_WIDTH} = env
  const {mobileOpen,setMobileOpen,setIsOpenMenu,isOpenMenu} = useMenu()
  const handleDrawerToggle = ()=>{ setMobileOpen(!mobileOpen) }
  const DesktopMenu = ()=>{ setIsOpenMenu(!isOpenMenu)}

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : '0';


    

  return (

      
      <Toolbar
      component="header"
      sx={{ position:'fixed', display: "flex", width:'100%', zIndex:1100, 
      backdropFilter:'blur(5px)',  alignItems: "center",padding:'0 !important',
      boxShadow:'0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <Box display='flex' justifyContent='space-between' width='100%' alignItems="center" >
          <Box>
              <IconButton onClick={handleDrawerToggle} sx={{ minWidth:'50px', display:{xs:'block',md:'none'} }}>
              <Icono />
            </IconButton>
            <IconButton onClick={DesktopMenu} sx={{  minWidth:'50px', marginLeft: margin_left, display:{xs:'none', md:'block'} }}>
              <Icono />
            </IconButton>
          </Box>
          <Stack direction='row' spacing={1} marginRight={1} >
            <ThemeToggle />
            <ProfileMenu />
          </Stack>
        </Box>
    </Toolbar>

  );
}

export default ToolbarMain;

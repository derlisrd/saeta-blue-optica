import { Icon } from "@iconify/react";
import { Button,  Divider, IconButton,  Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import DialogPregunta from "../Dialogo/DialogPregunta";

function ProfileMenu() {

    const {logOut} = useAuth()
    const [openDialog,setOpenDialog] = useState(false)
    const toggleDialog = ()=>{setOpenDialog(!openDialog)}
    const confirmLogOut= ()=>{
      toggleDialog()
    }



    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return (
    <>


      <DialogPregunta 
      title="Cerrar" text="Estás seguro que desea cerrar la sesión?" 
      open={openDialog} onClose={toggleDialog} icon={{ name:'uim:exclamation-triangle',color:'orange' }} >
          <Button variant="outlined" onClick={toggleDialog} >No, cancelar</Button>
          <Button variant="contained"  onClick={logOut}>Sí, cerrar sesión</Button>
      </DialogPregunta>



          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Icon icon='ph:user-circle-duotone' height={30} />
          </IconButton>


    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
           Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
           My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={confirmLogOut}>
           Salir
        </MenuItem>
      </Menu>  </>);
}

export default ProfileMenu;
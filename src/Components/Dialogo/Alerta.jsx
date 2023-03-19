import { Icon } from "@iconify/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom } from "@mui/material";


function DialogAlerta({title,text,open,onClose,children}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon icon="ic:twotone-error" color="#d32f2f" height={96} /></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="error">Cerrar</Button>
    </DialogActions>
  </Dialog> );
}

export default DialogAlerta;
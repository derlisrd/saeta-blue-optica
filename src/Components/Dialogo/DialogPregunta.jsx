import { Icon } from "@iconify/react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom } from "@mui/material";


function DialogPregunta({title,text,open,onClose,children,icon}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon icon={icon.name} color={icon.color} height={96} /></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      {children}
    </DialogActions>
  </Dialog> );
}

export default DialogPregunta;
import { Icon } from "@iconify/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Zoom } from "@mui/material";


function DialogBorrar({onClose,open,text,send,isLoading}) {
    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>Borrar</DialogTitle>
    <DialogContent>
        <Box>{isLoading && <LinearProgress />}</Box>
      <Box display="flex" padding={2} justifyContent="center"><Icon icon="uim:exclamation-triangle" color="orange" height={96} /></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        <Button onClick={send} variant="contained">Borrar</Button>
    </DialogActions>
  </Dialog>  );
}

export default DialogBorrar;
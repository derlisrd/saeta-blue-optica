
import { Icon } from "@iconify/react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Zoom } from "@mui/material";
import { green } from "@mui/material/colors";

function DialogAlertaOk({title,text,open,onClose}) {


    return ( <Dialog sx={{ ".MuiDialog-paper":{  borderRadius:'12px'} }} open={open} maxWidth="xs" onClose={onClose} TransitionComponent={Zoom} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Box display="flex" padding={2} justifyContent="center"><Icon icon="icon-park-twotone:success" color={green[600]} height={96} /></Box>
      <DialogContentText align="center">{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button variant="contained" color="success">Ok</Button>
    </DialogActions>
  </Dialog> );
}

export default DialogAlertaOk;
import { Icon } from "@iconify/react";
import { Tooltip,IconButton } from "@mui/material";

function ButtonTip({title,icon,onClick}) {
    return ( <Tooltip arrow title={title}><IconButton onClick={onClick} ><Icon icon={icon} /></IconButton></Tooltip> );
}

export default ButtonTip;
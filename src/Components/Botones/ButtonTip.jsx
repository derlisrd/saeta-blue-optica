import { Tooltip,IconButton,Icon } from "@mui/material";

function ButtonTip({title,icon,onClick}) {
    return ( <Tooltip arrow title={title}><IconButton onClick={onClick} ><Icon>{icon}</Icon></IconButton></Tooltip> );
}

export default ButtonTip;
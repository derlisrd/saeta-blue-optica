import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useTema } from "../../Providers/TemaProvider";

function ThemeToggle() {
    const {mode,toggleTheme} = useTema()
    const icono = mode === 'light' ? 'icon-park-twotone:dark-mode' :  'ic:twotone-light-mode'
    return <IconButton onClick={toggleTheme} ><Icon icon={icono} height={24} /></IconButton>;
}

export default ThemeToggle;
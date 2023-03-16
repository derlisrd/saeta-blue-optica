import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useTema } from "../../Providers/TemaProvider";

function ThemeToggle() {
    const {mode,toggleTheme} = useTema()

    return (<IconButton onClick={toggleTheme} ><Icon icon='icon-park-twotone:dark-mode' height={24} /></IconButton>  );
}

export default ThemeToggle;
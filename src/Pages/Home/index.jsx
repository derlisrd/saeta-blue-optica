import { Icon } from "@iconify/react";
import { Box,  Typography } from "@mui/material";

function Home() {
    return (<Box sx={{ display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',flexDirection:'column' }}>

                <Icon icon='emojione:lion-face' height={240} />
                <Typography variant="h3">
                    LIONS
                </Typography>
                <Typography variant="h3">
                    Sistema de Gestion Administrativo
                </Typography>

    </Box>);
}

export default Home;
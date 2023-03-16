import { Alert, Box, Button, FormControlLabel, Grid, Switch, TextField, Typography, Zoom } from "@mui/material";
import { useRef,useState } from "react";
import { Navigate } from "react-router-dom";
import { env } from "../../App/config";
import { useAuth } from "../../Providers/AuthProvider";

function Login() {
    const { logIn ,load,userData} = useAuth();
    const {login} = userData;
    
    const userRef = useRef(null)
    const passRef = useRef(null)
    const [recordar,setRecordar] = useState(false);

    const trySignIn = e=>{
      e.preventDefault();
      const data = new FormData(e.target)
      logIn(Object.fromEntries(data.entries()),recordar);
    }

    if(login){
        return <Navigate to={env.HOME_PAGE_URL} />
    }
  return (
    <form onSubmit={trySignIn}>
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth={360} borderRadius={5}  p={5}
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        sx={{ backdropFilter:'blur(6px) saturate(180%)',bgcolor:'background.paper',border:'1.5px solid rgba(209, 213, 219, 0.3)' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" marginY={1} variant="h5">
              Ingresar
            </Typography>
          </Grid>
          <Grid item xs={12}>
           {load.active &&  <Zoom in={load.active}>
              <Alert severity="error" >{load.msj}</Alert>
            </Zoom>
            }
          </Grid>
          <Grid item xs={12}>
            <TextField required  disabled={load.login} name="username_user" inputRef={userRef} autoFocus label="Usuario" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField required  disabled={load.login} name="password_user" inputRef={passRef} label="Contraseña" type="password" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button size="large" type="submit" disabled={load.login} fullWidth variant="contained">
              {load.login ? 'Cargando...' : 'Login'}
            </Button>
          </Grid>
          <Grid item xs={12}>
          <FormControlLabel disabled={load.login} control={<Switch checked={recordar} onChange={e=> setRecordar(e.target.checked)} />} label="Recordarme" />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </form>
  );
}

export default Login;

import { Grid, TextField, Typography } from "@mui/material";
import { useAuth } from "../../../Providers/AuthProvider";
import { useEffect, useState } from "react";

function Empresa() {

    const {dataEmpresa,setDataEmpresa} = useAuth()
    const [form,setForm] = useState({})


    console.log(dataEmpresa);

    useEffect(()=>{
        setForm(dataEmpresa)
    },[dataEmpresa])


    return (<Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4">Datos de empresa</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="caption">Empresa</Typography>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField label='Nombre de empresa' name="nombre_empresa" value={form?.nombre_empresa} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField label='Nombre de propietario' value={form?.propietario_empresa} />
                </Grid>
            </Grid>
        </Grid>
    </Grid>  );
}

export default Empresa;
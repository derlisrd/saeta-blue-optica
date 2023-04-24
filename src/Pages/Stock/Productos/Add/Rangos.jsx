import { Grid, TextField } from "@mui/material";
import NumberFormatCustom from "../../../../Components/TextFields/NumberFormatCustom";

function Rangos({onChange,form}) {

    return (<Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
            <TextField label='Min Esferico' value={form.min_esferico} onChange={onChange} name="min_esferico" InputProps={{ 
                inputComponent: NumberFormatCustom
             }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <TextField label='Max Esferico' value={form.max_esferico} onChange={onChange} name="max_esferico" 
                InputProps={{ 
                    inputComponent: NumberFormatCustom
                 }}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <TextField label='Min Cilindrico' value={form.min_cilindrico} onChange={onChange} name="min_cilindrico" InputProps={{ 
                inputComponent: NumberFormatCustom
             }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <TextField label='Max Cilindrico' value={form.max_cilindrico} onChange={onChange} name="max_cilindrico" 
                InputProps={{ 
                    inputComponent: NumberFormatCustom
                 }}
            />
        </Grid>
    </Grid> );
}

export default Rangos;
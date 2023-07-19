import { Grid, TextField } from "@mui/material";
import InputNumber from "./InputNumber";


function Pagos({pagos,setPagos}) {
    
    const change = (e)=>{
        const {value,name} = e.target
        setPagos({...pagos,[name]:value})
    }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <InputNumber label="Efectivo" value={pagos.efectivo_recibo} onChange={change} name="efectivo_recibo" />
      </Grid>
      <Grid item xs={12}>
        <InputNumber label="Transferencia" value={pagos.transferencia_recibo} onChange={change} name="transferencia_recibo" />
      </Grid>
      <Grid item xs={12}>
        <InputNumber label="Cheque" value={pagos.cheque_recibo} onChange={change} name="cheque_recibo" />
      </Grid>
      <Grid item xs={12}>
        <TextField size="small" fullWidth label="Cheque nro" value={pagos.cheque_nro_recibo} onChange={change} name="cheque_nro_recibo" />
      </Grid>
      <Grid item xs={12}>
        <TextField size="small" fullWidth label="Banco" value={pagos.banco_recibo} onChange={change} name="banco_recibo" />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export default Pagos;

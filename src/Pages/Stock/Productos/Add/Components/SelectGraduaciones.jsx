import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { graduaciones } from "./graduaciones";

export function SelectEsferico({onChange,value}) {
    return ( <FormControl fullWidth>
        <InputLabel id="graduacion_esferico">Esférico</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Esférico"
          name='graduacion_esferico'
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {graduaciones.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}


export function SelectCilindrico({value,onChange}) {
    return ( <FormControl fullWidth>
        <InputLabel id="graduacion_cilindrico">Cilindrico</InputLabel>
        <Select
          onChange={onChange}
          value={value}
          label="Cilindrico"
          name='graduacion_cilindrico'
        >
          <MenuItem value="" disabled>Seleccionar</MenuItem>
          {graduaciones.map((e,i)=>(
            <MenuItem key={i} value={e}>{e}</MenuItem>
          ))}
          
        </Select>
      </FormControl> );
}


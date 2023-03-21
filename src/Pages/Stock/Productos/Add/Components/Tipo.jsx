import { FormControl, FormControlLabel, FormLabel, RadioGroup,Radio } from "@mui/material";

function Tipo({name}) {
    return ( <FormControl>
        <FormLabel>Tipo</FormLabel>
        <RadioGroup
          row
          name={name}
        >
          <FormControlLabel value="1" control={<Radio />} label="Artículo" />
          <FormControlLabel value="2" control={<Radio />} label="Servicio" />
        </RadioGroup>
      </FormControl> );
}

export default Tipo;
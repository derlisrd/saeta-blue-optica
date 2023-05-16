import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function SelectOjos({value,onChange}) {
    return ( <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Seleccione lados</FormLabel>
        <RadioGroup
          row
          defaultValue='ambos'
          value={value}
          onChange={onChange}
        >
          <FormControlLabel value="ambos" control={<Radio />} label="Ambos" />
          <FormControlLabel value="derecho" control={<Radio />} label="Derecho" />
          <FormControlLabel value="izquierdo" control={<Radio />} label="Izquierdo" />
        </RadioGroup>
      </FormControl> );
}

export default SelectOjos;
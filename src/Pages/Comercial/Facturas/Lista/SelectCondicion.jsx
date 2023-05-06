import {FormControl,InputLabel,Select,MenuItem} from '@mui/material'
function SelectCondicion({onChange,}) {
    return ( <FormControl fullWidth>
        
        <Select
            onChange={onChange}
            label="Condición"
            size='small'
            defaultValue='0'
        >
          <MenuItem value='0'>Todos</MenuItem>
          <MenuItem value='1'>Contado</MenuItem>
          <MenuItem value='2'>Crédito</MenuItem>
        </Select>
      </FormControl> );
}

export default SelectCondicion;
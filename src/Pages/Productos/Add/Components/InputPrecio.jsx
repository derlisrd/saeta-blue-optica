import { Icon } from "@iconify/react";
import { InputAdornment, TextField } from "@mui/material";
import NumberFormatCustom from "../../../../Components/TextFields/NumberFormatCustom";

function InputPrecio({ name, value, onChange,label,...rest}) {
    return (<TextField label={label} {...rest}
        name={name}
        value={value}
        onChange={onChange}
    InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon icon="ic:baseline-attach-money" height={22}  />
          </InputAdornment>
        ),
        inputProps: { min: 0 },
        inputComponent: NumberFormatCustom,
      }}
/> );
}

export default InputPrecio;
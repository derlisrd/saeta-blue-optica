import { Stack } from "@mui/material";
import { useDeposito } from "./DepositoProvider";


function ListaOpciones({rowProps}) {
   
    const {setFormSelect,llaveDialog} = useDeposito()

    
    const open = (form,metodo)=>{
        setFormSelect(form)
        llaveDialog(metodo,true)
    }


    return (
    <Stack direction="row">
        <ButtonTip onClick={()=>{open(rowProps,'edit')}} icon='edit' title='Editar'  />
        <ButtonTip onClick={()=>{open(rowProps,'delete')}} icon='delete_forever' title='Borrar' />
    </Stack>
    )
}

export default ListaOpciones ;
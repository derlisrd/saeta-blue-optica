import { Icon } from "@iconify/react";
import AddButton from "../../../../Components/Botones/AddButton";
import Tablas from "../../../../Components/Tablas";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { useListadoProducto } from "./ListadoProductoProvider";
import TextFieldBuscar from "./TextFieldBuscar";
import Paginacion from "./Paginacion";
import { IconButton, Stack } from "@mui/material";
import { red } from "@mui/material/colors";
import { columns } from "./columns";

function Lista() {
    const {navigate} = useGotoNavigate()
    const {lista,isLoading,llaveDialog} = useListadoProducto()
    

    //const FilterData =  lista.filter(item => item.nombre_producto.toLowerCase().includes(inputSearch.toLowerCase())|| item.codigo_producto.toLowerCase().includes(inputSearch.toLowerCase()));

    const inputs = (
        <Stack direction="row" spacing={1}>
            <TextFieldBuscar />
            <AddButton onClick={()=>{ navigate('/productos/add') }} />
        </Stack>
    )

    const openStock = ()=>{
        llaveDialog('stock',true)
    }

    function ListaOpciones({rowProps}) {
        return (<Stack direction="row"> 
            {rowProps.tipo_producto==="1" && <IconButton onClick={()=>{openStock(rowProps)}} ><Icon icon="fluent-mdl2:product-release" /></IconButton> }
            <IconButton onClick={()=>{navigate(`/productos/edit/${rowProps.id_producto}`)}}><Icon icon="tabler:edit" /></IconButton>
            <IconButton onClick={()=>{}}><Icon color={red[300]} icon="tabler:trash" /> </IconButton>
        </Stack>)
    }


    return (
    <>
    <Tablas
        title="Productos y Servicios"
        subtitle="Módulo de productos y servicios"
        icon={{ name:'fluent-mdl2:product-variant' }}
        loading={isLoading}
        columns={columns}
        datas={lista}
        showOptions
        Accions={ListaOpciones}
        inputs={inputs}
        />
        <Paginacion />
    </>
    );
}

export default Lista;
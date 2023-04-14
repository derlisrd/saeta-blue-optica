
import AddButton from "../../../../Components/Botones/AddButton";
import Tablas from "../../../../Components/Tablas";
import useGotoNavigate from "../../../../Hooks/useGotoNavigate";
import { useListadoProducto } from "./ListadoProductoProvider";
import ListaOpciones from "./ListaOpciones";

function Lista() {
    const {navigate} = useGotoNavigate()
    const {lista,isLoading} = useListadoProducto()

    const columns = [
        {
            field:'codigo_producto',
            title:'COD.'
        },
        {
            field:'nombre_producto',
            title:'nombre'
        },
        {
            field:'tipo_producto',
            title:'tipo',
            compareField:"tipo_producto",
            styleFieldCondition: "tipo_producto",
            items: {
                "1": "Artículo",
                "2": "Servicio",
              },
            styleCondition: {
                "2": {
                  backgroundColor: "#6b8eff",
                  padding: "3px",fontWeight:"bold",
                  borderRadius: "5px",
                  color: "#004c78",
                },
                "1": {
                  backgroundColor: "#2dec76",
                  padding: "3px", fontWeight:"bold",
                  borderRadius: "5px",
                  color: "#007b02",
                },
            }
        },
        
    ];

    const inputs = (<AddButton onClick={()=>{ navigate('/productos/add') }} />)



    

    return (<Tablas
        title="Productos y Servicios"
        subtitle="Módulo de productos y servicios"
        icon={{ name:'fluent-mdl2:product-variant' }}
        loading={isLoading}
        columns={columns}
        datas={lista}
        showOptions
        Accions={ListaOpciones}
        inputs={inputs}
        />);
}

export default Lista;
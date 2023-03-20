import AddButton from "../../Components/Botones/AddButton";
import Tablas from "../../Components/Tablas";
import { useClientes } from "./ClientesProvider";
import ListaColumns from "./ListaColumns";
import ListaOpciones from "./ListaOpciones";

function ListaClientes() {
    const {isLoading,lista,llaveDialog} = useClientes()

    const Inputs = (<AddButton onClick={()=>{ llaveDialog('add',true) }} />)

    return ( <Tablas
        title="Clientes"
        subtitle="Módulo de listado de clientes"
        inputs={Inputs}
        datas={lista}
        loading={isLoading}
        icon={{ name:'ic:twotone-people' }}
        showOptions
        Accions={ListaOpciones}
        columns={ListaColumns}
         /> );
}

export default ListaClientes;
import Tablas from "../../Components/Tablas";

function ListaClientes() {

    const columns = [
        {
            field:'doc_cliente',
            title:'Doc.'
        },
        {
            field:'nombre_cliente',
            title:'Nombre'
        }
    ]
    const datas = []

    const Acciones = ()=>{
        return <></>
    }

    return ( <Tablas
        title="Clientes"
        subtitle="Módulo de listado de clientes"
        datas={datas}
        icon={{ name:'ic:twotone-people' }}
        Accions={Acciones}
        columns={columns}
         /> );
}

export default ListaClientes;
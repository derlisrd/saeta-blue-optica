const ListaColumns= [
    {
        field:'ruc_cliente',
        title:'Doc.'
    },
    {
        field:'nombre_cliente',
        title:'Nombre'
    },
    {
        field:'fantasia_cliente',
        title:'Fantasia'
    },
    {
        field:'direccion_cliente',
        title:'Direccion'
    },
    {
        field:'telefono_cliente',
        title:'Tel.'
    },
    
    {
        field:'tipo_pago',
        title:'Tipo de pago',
        compareField:"tipo_pago",
        styleFieldCondition: "tipo_pago",
            items: {
                "1": "Normal",
                "2": "Semanal",
                "3": "Quincenal",
                "4": "Mensual"
              },
    },
]
export default ListaColumns ;
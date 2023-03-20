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
                "3": "Mensual",
                "4": "Quincenal"
              },
    },
]
export default ListaColumns ;
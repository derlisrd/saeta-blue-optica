export const columns = [
    {
        field:'id_pedido',
        title:'NRO'
    },
    {
        field:'fecha_pedido',
        title:'fecha'
    },
    {
        field:'nombre_user',
        title:'vendedor'
    },
    {
        field:'nombre_cliente',
        title:'cliente'
    },
    {
        field:'entregado_pedido',
        title:'Estado',
        compareField:"entregado_pedido",
        styleFieldCondition: "entregado_pedido",
        items: {
            "0": "PENDIENTE...",
            "1": "ENTREGADO"
          },
          styleCondition: {
            "0": {
              backgroundColor: "#86042b",
              padding: "4px",fontWeight:"bold",
              borderRadius: "5px",
              color: "#fff",
            },
            "1": {
              backgroundColor: "#2dec76",
              padding: "4px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#007b02",
            },
        }
    },
]
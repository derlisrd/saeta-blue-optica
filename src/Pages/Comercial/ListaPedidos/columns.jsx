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
        field:'estado_pedido',
        title:'Estado',
        compareField:"estado_pedido",
        styleFieldCondition: "estado_pedido",
        items: {
            "0": "CANCELADO...",
            "1": "PENDIENTE"
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
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
      field:'estado_pago',
      title:'Pago',
      compareField: "estado_pago",
      items: {
          "0": "PENDIENTE...",
          "1": "PAGADO"
        },
      styleFieldCondition: "estado_pago",  
      styleCondition: {
        "0": {
          backgroundColor: "#86042b",
          padding: "4px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#fff",
        },
        "1": {
          backgroundColor: "#eca92d",
          padding: "4px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#000000",
        },
      }
    },
    {
      field:'tipo_pedido',
      title:'Tipo',
      compareField: "tipo_pedido",
      items: {
          "1": "PEDIDO DE VENTA",
          "2": "CORTESIA",
          "3": "GARANTIA",
        },
    },
    {
        field:'estado_pedido',
        title:'Estado',
        compareField:"estado_pedido",
        styleFieldCondition: "estado_pedido",
        items: {
            "0": "CANCELADO...",
            "1": "PENDIENTE",
            "2": "EN PRODUCCION",
            "3": "REVISION",
            "4": "ENTREGADO"
          },
          styleCondition: {
            "0": {
              backgroundColor: "#86042b",
              padding: "4px",fontWeight:"bold",
              borderRadius: "5px",
              color: "#fff",
            },
            "1": {
              backgroundColor: "#eca92d",
              padding: "4px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#000000",
            },
            "2": {
              backgroundColor: "#2d96ec",
              padding: "4px", fontWeight:"bold",
              borderRadius: "5px",
              color: "#ffffff",
            },
            "3": {
                backgroundColor: "#2d96ec",
                padding: "4px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#ffffff",
            },
            "4": {
                backgroundColor: "#ffffff",
                padding: "4px", fontWeight:"bold",
                borderRadius: "5px",
                color: "#0c962a",
              },
        }
    },
]
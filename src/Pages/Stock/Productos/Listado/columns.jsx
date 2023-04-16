export const columns = [
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
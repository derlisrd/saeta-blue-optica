export const columns = [
    {
        field:'id_factura',
        title:'#'
    },
    {
        field:'fecha_factura',
        title:'Fecha'
    },
    {
        field:'nro_factura',
        title:'NRO'
    },
    {
        field:'nombre_cliente',
        title:'Cliente'
    },
    {
        field:'factura_pagado',
        title:'ESTADO',
        compareField: "factura_pagado",
        items: {
            "1": "PAGADO",
            "0": "PENDIENTE",
          },
        styleFieldCondition: "factura_pagado",  
        styleCondition: {
        "0": {
          backgroundColor: "#d56565",
          padding: "4px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#fff",
        },
        "1": {
          backgroundColor: "#81c583",
          padding: "4px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#000000",
        },
      }
    },
    {
        field:'tipo_factura',
        title:'Condición',
        compareField: "tipo_factura",
        items: {
            "1": "CONTADO",
            "2": "CREDITO",
          },
        styleFieldCondition: "tipo_factura",  
        styleCondition: {
        "1": {
          backgroundColor: "#1db552",
          padding: "4px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#fff",
        },
        "2": {
          backgroundColor: "#eca92d",
          padding: "4px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#000000",
        },
      }
    },
    {
        field:'total_factura',
        title:'Total',
        isNumber:true,
        style:{
            fontWeight:'bold'
        }
    },
    
]
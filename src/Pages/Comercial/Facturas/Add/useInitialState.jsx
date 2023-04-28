import { funciones } from "../../../../App/helpers/funciones";

function useInitialState() {
    const iDialogs = {
        main:true,
        finalizar:false,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false,
        obs:false,
        precio:false
    }


    const initialFactura = {
        items:[],
        total:0,
        iva5:0,
        iva10:0,
        exenta:0,
        cliente:{
            id_cliente:1,
            ruc_cliente:'X',
            nombre_cliente:'SIN NOMBRE',
            direccion_cliente:''
        },
        tipo_pedido:'1',
        codigo_cliente_pedido:'',
        fecha: funciones.fechaActualYMD(),
        hora: funciones.HoraActualHMS(),
        obs: {
            cliente:'',
            laboratorio:'',
            armazon_id:'0'
        }
    }


    return { iDialogs, initialFactura}
}

export default useInitialState;
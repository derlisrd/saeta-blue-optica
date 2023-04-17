import { createContext, useContext,useState } from "react";
import useInitialStates from "./useInitialStates";
import { funciones } from "../../../App/helpers/funciones";

const PedidosContext = createContext()

function PedidosProvider({children}) {
    const {iDialogs} = useInitialStates()
    const [dialogs,setDialogs] = useState(iDialogs)

    const initialFactura = {
        items:[],
        total:0,
        totaliva5:0,
        totaliva10:0,
        exenta:0,
        cliente:{
            id_cliente:1,
            ruc_cliente:'X',
            nombre_cliente:'SIN NOMBRE',
            direccion_cliente:''
        },
        fecha: funciones.fechaActualYMD(),
        hora: funciones.HoraActualHMS()
    }
    const [cargas,setCargas] = useState({
        main:false,
        stock:false
    })
    const [formDepositoStock,setFormDepositoStock] = useState([])
    const [seleccionado,setSeleccionado] = useState([])
    const [factura,setFactura] = useState(initialFactura)


    const setearFactura = (obj)=>{
        let total = 0,iva5=0,iva10=0,exenta=0;
        obj.items.forEach(e=>{
            total += e.cantidad * e.precio
            exenta += e.iva === 0 && (e.cantidad * e.precio)
            iva5 += e.iva === 5 && (e.cantidad * e.precio)
            iva10 += e.iva === 10 && (e.cantidad * e.precio)
        })
        obj.total = total;
        obj.iva10 = iva10;
        obj.iva5 = iva5;
        obj.exenta = exenta;
        setFactura(obj)
        console.log(obj);
    }

    const values = {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas}
    return <PedidosContext.Provider value={values}>{children}</PedidosContext.Provider>
}


export const usePedidos = ()=>{
    const {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas} = useContext(PedidosContext)
    return {dialogs,setDialogs,factura,setFactura,setearFactura,initialFactura,formDepositoStock,setFormDepositoStock,seleccionado,setSeleccionado,cargas,setCargas}
}

export default PedidosProvider;
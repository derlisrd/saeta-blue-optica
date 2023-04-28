import { createContext, useContext, useState } from "react";
//import { useAuth } from "../../../Providers/AuthProvider";
import useInitialState from "./useInitialState";

const FacturasContext = createContext(null)

function FacturasProvider({children}) {

    //const {userData} = useAuth()
    const {iDialogs,initialFactura} = useInitialState()
    const [dialogs,setDialogs] = useState(iDialogs)

    const [factura,setFactura] = useState(initialFactura)
    const [indexCambioPrecio,setIndexCambioPrecio] = useState(-1)

    const setearFactura = (obj)=>{
        let total = 0,iva5=0,iva10=0,exenta=0;
        
        obj.items.forEach(e=>{
            if(e.tipo<3){
                total += e.cantidad * e.precio
                exenta += e.iva === 0 && (e.cantidad * e.precio)
                iva5 += e.iva === 5 && (e.cantidad * e.precio)
                iva10 += e.iva === 10 && (e.cantidad * e.precio)
            }
        })
        obj.total = total;
        obj.iva10 = iva10;
        obj.iva5 = iva5;
        obj.exenta = exenta;
        setFactura(obj)
        
    }



    const values = {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura}
    return <FacturasContext.Provider value={values}>{children}</FacturasContext.Provider>
}

export const useFacturas = ()=>{
    const {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura} = useContext(FacturasContext)
    return {dialogs,setDialogs,indexCambioPrecio,setIndexCambioPrecio,factura,setearFactura,initialFactura}
}

export default FacturasProvider;
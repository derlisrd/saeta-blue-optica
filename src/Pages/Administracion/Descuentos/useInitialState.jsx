function useInitialState() {
    const iCliente = {
        id_cliente:null,
        nombre_cliente:'',
        ruc_cliente:'',
        direccion_cliente:''
    }
    const iError = {
        code:0,
        active:false,
        message:''
    }

    
    const iForm = {
        codigo_producto:'',
        porcentaje_descuento:'',
    }

    const iProducto = []

    
    return {iError,iCliente,iProducto,iForm}
}

export default useInitialState;
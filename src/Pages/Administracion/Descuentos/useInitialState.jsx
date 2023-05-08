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

    const iProducto = {
        id_producto:null,
        codigo_producto:'',
        nombre_producto:'',
        precio_producto:'',
        preciom_producto:''
    }

    
    return {iError,iCliente,iProducto}
}

export default useInitialState;
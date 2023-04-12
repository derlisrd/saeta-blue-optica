
function useInitialStates() {
    const iDialogs = {
        main:true,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false
    }

    return { iDialogs}

}

export default useInitialStates;


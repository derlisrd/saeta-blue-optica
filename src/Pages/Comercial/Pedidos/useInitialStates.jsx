
function useInitialStates() {
    const iDialogs = {
        main:false,
        finalizar:false,
        registrar_cliente:false,
        buscar_cliente:false,
        select_deposito_stock:false
    }

    return { iDialogs}

}

export default useInitialStates;


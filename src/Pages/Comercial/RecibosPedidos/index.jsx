import Lista from "./Lista";
import RecibosProvider from "./Provider";

function RecibosPedidos() {
    return (<RecibosProvider>
        <Lista />
    </RecibosProvider>);
}

export default RecibosPedidos;
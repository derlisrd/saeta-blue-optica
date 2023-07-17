import Lista from "./Lista";
import RecibosProvider from "./Provider";

function Recibos() {
    return (<RecibosProvider>
    <Lista />
    </RecibosProvider> );
}

export default Recibos;
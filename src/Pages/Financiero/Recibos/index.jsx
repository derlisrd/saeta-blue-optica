import Add from "./Add";
import Lista from "./Lista";
import Print from "./Print";
import RecibosProvider from "./Provider";

function Recibos() {
    return (<RecibosProvider>
    <Lista />
    <Add />
    <Print />
    </RecibosProvider> );
}

export default Recibos;
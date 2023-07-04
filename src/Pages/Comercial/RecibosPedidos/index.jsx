import DialogAdd from "./DialogAdd";
import Lista from "./Lista";
import RecibosProvider from "./Provider";

function RecibosPedidos() {
    return (<RecibosProvider>
        <Lista />
        <DialogAdd />
    </RecibosProvider>);
}

export default RecibosPedidos;
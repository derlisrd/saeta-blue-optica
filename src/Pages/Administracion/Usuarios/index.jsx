import Add from "./Add";
import Edit from "./Edit";
import Lista from "./Lista";
import Permisos from "./Permisos";
import UsuariosProvider from "./UsuariosProvider";

function Usuarios() {
    return ( <UsuariosProvider>
        <Add />
        <Edit />
        <Permisos />
        <Lista />
    </UsuariosProvider> );
}

export default Usuarios;
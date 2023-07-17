import {createContext,useContext,useState,useEffect,useCallback} from 'react';


const Context = createContext()

function RecibosProvider({children}) {
    const [listas,setListas] = useState([])
    
    
    const getLista = useCallback(async()=>{
        setListas([])
    },[])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista();}
        return () => {isActive = false; ca.abort();};
    }, [getLista]);

    const values = {listas}
    return (<Context.Provider value={values} >{children}</Context.Provider>);
}

export function useRecibosProvider(){
    const {listas} = useContext(Context)
    return {listas}
}

export default RecibosProvider;
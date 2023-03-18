import {createContext,useContext,useState,useEffect,useCallback} from 'react';

const ClientesContext = createContext()

const ClientesProvider = ({children}) => {
  
  

  const values = {}
  return <ClientesContext.Provider value={values}>{children}</ClientesContext.Provider>
  
}

export default ClientesProvider

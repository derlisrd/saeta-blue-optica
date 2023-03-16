import React from 'react'
import ClientesProvider from './ClientesProvider'
import ListaClientes from './ListaClientes'

const Clientes = () => {
  return (
    <ClientesProvider>
      <ListaClientes />
    </ClientesProvider>
  )
}

export default Clientes

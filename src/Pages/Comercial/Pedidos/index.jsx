import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'
import DialogSelectDepositoStock from './DialogSelectDepositoStock'
import DialogBuscarCliente from './DialogBuscarCliente'
import DialogRegistrarCliente from './DialogRegistrarCliente'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <DialogRegistrarCliente />
      <DialogBuscarCliente />
      <DialogSelectDepositoStock />
      <DialogMain />
    </PedidosProvider>
  )
}

export default Pedidos

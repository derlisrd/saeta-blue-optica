import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'
import DialogSelectDepositoStock from './DialogSelectDepositoStock'
import DialogBuscarCliente from './DialogBuscarCliente'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <DialogBuscarCliente />
      <DialogSelectDepositoStock />
      <DialogMain />
    </PedidosProvider>
  )
}

export default Pedidos

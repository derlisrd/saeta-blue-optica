import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'
import DialogSelectDepositoStock from './DialogSelectDepositoStock'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <DialogSelectDepositoStock />
      <DialogMain />
    </PedidosProvider>
  )
}

export default Pedidos

import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <DialogMain />
    </PedidosProvider>
  )
}

export default Pedidos

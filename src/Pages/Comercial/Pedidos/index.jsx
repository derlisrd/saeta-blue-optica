import React from 'react'
import DialogMain from './DialogMain'
import PedidosProvider from './PedidosProvider'
import DialogSelectDepositoStock from './DialogSelectDepositoStock'
import DialogBuscarCliente from './DialogBuscarCliente'
import DialogRegistrarCliente from './DialogRegistrarCliente'
import Main from './Main'
import FinalizarPedido from './FinalizarPedido'
import DialogObs from './DialogObs'

const Pedidos = () => {
  return (
    <PedidosProvider>
      <DialogObs />
      <FinalizarPedido />
      <DialogRegistrarCliente />
      <DialogBuscarCliente />
      <DialogSelectDepositoStock />
      <DialogMain />
      <Main />
    </PedidosProvider>
  )
}

export default Pedidos

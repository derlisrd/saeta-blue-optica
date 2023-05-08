import {  Route, Routes } from "react-router-dom";
import { Suspense, lazy } from 'react';
import LoadingPage from "../Components/UI/LoadingPage";

import { env } from "../App/config";






const Loadable = (Component) => (props) => {
    return (
      <Suspense
        fallback={
          <LoadingPage />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };


function MainPages() {

  return (
    
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path={env.LOGIN_PAGE_URL} element={<Login />} />
        
        <Route path="/admin" element={<Base />}>
          <Route path="home" element={<Home />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="productos" element={<ListadoProductos />} />
          <Route path="productos/add" element={<AddProducto />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="productos/edit/:id" element={<EditProduct />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="pedidos/lista" element={<ListaPedidos />} />
          <Route path="facturas" element={<Facturas />} />
          <Route path="facturas/add" element={<AddFactura />} />
          <Route path="descuentos" element={<Descuentos />} />
          <Route path="recibospedidos" element={<RecibosPedidos />} />
          <Route path="facturas/lista" element={<ListaFacturas />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="depositos" element={<Depositos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="empresa" element={<Empresa />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

const Login = Loadable(lazy(() => import('./Auth/Login')));
const Home = Loadable(lazy(() => import('./Home')));
const Base = Loadable(lazy(() => import('./Base')));
const Clientes = Loadable(lazy(() => import('./Administracion/Clientes')));
const Proveedores = Loadable(lazy(() => import('./Administracion/Proveedores')));
const Empleados = Loadable(lazy(() => import('./RRHH/Empleados')));
const Depositos = Loadable(lazy(() => import('./Stock/Depositos')));
const Categorias = Loadable(lazy(() => import('./Stock/Categorias')));
const NotFound = Loadable(lazy(() => import('./Status/NotFound')));
const AddProducto = Loadable(lazy(() => import('./Stock/Productos/Add')));
const Inventario = Loadable(lazy(() => import('./Stock/Inventario')));
const EditProduct = Loadable(lazy(() => import('./Stock/Productos/Edit/EditProduct')));
const ListadoProductos = Loadable(lazy(() => import('./Stock/Productos/Listado')));
const Pedidos = Loadable(lazy(() => import('./Comercial/Pedidos')));
const ListaPedidos = Loadable(lazy(() => import('./Comercial/ListaPedidos')));
const Usuarios = Loadable(lazy(() => import('./Administracion/Usuarios')));
const Perfil = Loadable(lazy(() => import('./Administracion/Usuarios/Perfil')));
const Facturas = Loadable(lazy(() => import('./Comercial/Facturas')));
const ListaFacturas = Loadable(lazy(() => import('./Comercial/Facturas/Lista')));
const AddFactura = Loadable(lazy(() => import('./Comercial/Facturas/Add')));
const Empresa = Loadable(lazy(() => import('./Administracion/Empresa')));
const Descuentos = Loadable(lazy(() => import('./Administracion/Descuentos')));
const RecibosPedidos = Loadable(lazy(()=> import('./Comercial/RecibosPedidos')));
export default MainPages;

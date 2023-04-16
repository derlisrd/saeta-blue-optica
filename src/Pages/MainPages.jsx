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
          <Route path="productos/edit/:id" element={<EditProduct />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="empleados" element={<Empleados />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="depositos" element={<Depositos />} />
          <Route path="categorias" element={<Categorias />} />
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
const EditProduct = Loadable(lazy(() => import('./Stock/Productos/Edit/EditProduct')));
const ListadoProductos = Loadable(lazy(() => import('./Stock/Productos/Listado')));
const Pedidos = Loadable(lazy(() => import('./Comercial/Pedidos')));
const Usuarios = Loadable(lazy(() => import('./Administracion/Usuarios')));
const Perfil = Loadable(lazy(() => import('./Administracion/Usuarios/Perfil')));
export default MainPages;

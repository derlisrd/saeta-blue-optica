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
          <Route path="pedidos" element={<Pedidos />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    
  );
}

const Login = Loadable(lazy(() => import('./Auth/Login')));
const Home = Loadable(lazy(() => import('./Home')));
const Base = Loadable(lazy(() => import('./Base')));
const Clientes = Loadable(lazy(() => import('./Clientes')));
const NotFound = Loadable(lazy(() => import('./Status/NotFound')));
const AddProducto = Loadable(lazy(() => import('./Productos/Add')));
const ListadoProductos = Loadable(lazy(() => import('./Productos/Listado')));
const Pedidos = Loadable(lazy(() => import('./Comercial/Pedidos')));
export default MainPages;

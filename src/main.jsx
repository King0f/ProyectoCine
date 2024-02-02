import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './App.css'
import Inicio from './pages/Inicio.jsx'
import PaginaError from './pages/PaginaError.jsx'
import Peliculas from './pages/Peliculas.jsx'
import InfoPelicula from './pages/InfoPelicula.jsx';
import { loader as InfoPeliculaLoader } from './pages/InfoPelicula.jsx';
import ComprarEntrada from './pages/ComprarEntrada.jsx';
import { loader as ComprarEntradaLoader } from './pages/ComprarEntrada.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import PaginaFinal from './pages/PaginaFinal.jsx';


function AppLayout() {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PaginaError />,
    children: [{
      path: "/",
      element: <Inicio />,
    },
    {
      path: "/resumenCompra",
      element: <PaginaFinal />,
    },
    {
      path: "/Peliculas",
      element: <Peliculas />,
    },
    {
      path: "/InfoPelicula/:id",
      element: <InfoPelicula/>,
      loader: InfoPeliculaLoader
    },
    {
      path: "/ComprarEntrada/:id",
      element: <ComprarEntrada/>,
      loader: ComprarEntradaLoader
    }]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
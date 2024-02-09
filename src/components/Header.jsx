import React from 'react';
import { NavLink } from 'react-router-dom';
export const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
  <div className="flex items-center">
    <NavLink to="/" className="flex items-center text-xl font-bold" activeClassName="text-gray-400">
      <img src="./imagenes/icono.png" alt="LateCinema" className="mr-2 w-10 h-10" /> LateCinema
    </NavLink>
  </div>
  <nav className="flex gap-4 items-center">
    <NavLink to="/Peliculas" activeClassName="border-b-2 border-gray-400">Catálogo</NavLink>
    <NavLink to="/Entradas" activeClassName="border-b-2 border-gray-400">Mis Entradas</NavLink>
    <NavLink to="/Favoritos" activeClassName="border-b-2 border-gray-400">Favoritos</NavLink>
  </nav>
</header>
  );
}

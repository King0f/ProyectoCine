import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function PaginaFinal() {
  const location = useLocation();
  const { detallesPelicula, horario, numEntradas } = location.state || {};

  if (!detallesPelicula || !horario || numEntradas === undefined) {
    return <Redirect to="/" />;
  }

  const totalCompra = calcularTotalCompra(7.5, numEntradas);

  return (
    <div className="container mx-auto my-44 max-w-lg p-4 bg-white shadow-md text-center">
      <h1 className="text-4xl font-bold mb-4">Datos de la compra</h1>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Título de la película:</h3>
        <p className="text-lg">{detallesPelicula ? detallesPelicula.titulo : 'No disponible'}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Número de entradas:</h3>
        <p className="text-lg">{numEntradas} Entradas</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Horario:</h3>
        <p className="text-lg">{horario}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Total de la compra:</h3>
        <p className="text-lg">{totalCompra} Euros</p>
      </div>
      <Link to="/">
      <button className='volver'>Volver a la pagina de inicio</button>
      </Link>
    </div>
  );
}

function calcularTotalCompra(precioEntrada, numEntradas) {
  return precioEntrada * numEntradas;
}

export default PaginaFinal;
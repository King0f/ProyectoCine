import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function ComprarEntrada() {
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const [detallesPelicula, setDetallesPelicula] = useState(null);
  const [horario, setHorario] = useState('');
  const [numEntradas, setNumEntradas] = useState(1);
  const [compraRealizada, setCompraRealizada] = useState(false);

  useEffect(() => {
    const obtenerDetallesPelicula = async () => {
      try {
        const apiKey = 'fcb629248cfa9804d5e0c9dec95073b5';
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`;
        const response = await fetch(url);
        const data = await response.json();

        if (data) {
          setDetallesPelicula({
            titulo: data.title,
            imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          });
        } 
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };

    obtenerDetallesPelicula();
  }, [id]);

  const handleCompra = () => {
    // Lógica para procesar la compra, puedes enviar la información al servidor o realizar otras acciones necesarias.
    setCompraRealizada(true);
  };
  if (compraRealizada) {
    navigate('/resumenCompra', { state: { detallesPelicula, horario, numEntradas } });
  }

  if (!detallesPelicula) {
    return <p>Cargando detalles de la película...</p>;
  }
  return (
    <div className="container mx-auto my-4 max-w-lg p-4  shadow-md">
      <div className="titulo-pelicula text-center text-white">
      <h2>{detallesPelicula.titulo}</h2>
      </div>
    <div className="imagen-pelicula">
      <img src={detallesPelicula.imagen} alt={`Poster de ${detallesPelicula.titulo}`} className="w-full rounded-md" />
    </div>
    <label htmlFor="horario" className="block mt-4 text-sm font-medium text-white">
      Selecciona el horario:
    </label>
    <select
      id="horario"
      onChange={(e) => setHorario(e.target.value)}
      value={horario}
      className="w-full px-4 py-2 mt-1 border rounded-md"
    >
      <option value="">-- Selecciona un horario --</option>
      <option value="10:45">10:45</option>
      <option value="12:15">12:15</option>
      <option value="15:00">15:00</option>
      <option value="17:15">17:15</option>
      <option value="19:45">19:45</option>
      <option value="22:00">22:00</option>

    </select>
    <label htmlFor="numEntradas" className="block mt-4 text-sm font-medium text-white">
      Número de entradas:
    </label>
    <input
      type="number"
      id="numEntradas"
      min="1"
      value={numEntradas}
      onChange={(e) => setNumEntradas(parseInt(e.target.value, 10))}
      className="w-full px-4 py-2 mt-1 border rounded-md"
    />
    <button onClick={handleCompra} className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
      Comprar
    </button>
    <Link to="/" className="block mt-4 text-sm text-blue-500 hover:underline">
      Volver al Catálogo
    </Link>
  </div>
  );
}

export default ComprarEntrada
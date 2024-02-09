import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneFilm} from '../slices/Thunks';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function ComprarEntrada() {
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {oneFilm} = useSelector( state => state.films)
  const [horario, setHorario] = useState('');
  const [numEntradas, setNumEntradas] = useState(1);
  const [compraRealizada, setCompraRealizada] = useState(false);

  useEffect(() => {
    dispatch(getOneFilm(id));
  }, [id]);
  const handleCompra = () => {
  const tituloPelicula = titulo;
  const rutaImagen = imagen;
  const hora = horario;
  const numeroEntradas = numEntradas;
  const precio = numEntradas * 7.5; // Asumiendo un precio ejemplo

  // Crear un objeto con la información de la compra
  const nuevaCompra = {
    id: id,
    titulo: tituloPelicula,
    imagen: rutaImagen,
    hora: hora,
    entradas: numeroEntradas,
    precio: precio
  };

  const entradasGuardadas = localStorage.getItem("EntradasCompradas");
  let entradasExistentes;
  if (entradasGuardadas) {
    // Si existe, recuperar el valor y convertirlo de nuevo a un array
    entradasExistentes = JSON.parse(entradasGuardadas);
    // Asegurarse de que entradasExistentes sea un array
    if (!Array.isArray(entradasExistentes)) {
      entradasExistentes = [entradasExistentes];
    }
  } else {
    // Si no hay entradas previas, crear un array vacío
    entradasExistentes = [];
  }

  // Añadir la nueva compra al array de entradas existentes
  entradasExistentes.push(nuevaCompra);

  // Guardar el array actualizado de nuevo en localStorage
  localStorage.setItem("EntradasCompradas", JSON.stringify(entradasExistentes));
  setCompraRealizada(true);
  };
  const titulo = oneFilm.title
  const imagen = `https://image.tmdb.org/t/p/w500${oneFilm.poster_path}`
  
  if (compraRealizada) {
    navigate('/resumenCompra', { state: { titulo, horario, numEntradas } });
  }

  if (!oneFilm) {
    return <p>Cargando detalles de la película...</p>;
  }
  
  return (
    <div className="container mx-auto my-4 max-w-lg p-4  shadow-md">
      <div className="titulo-pelicula text-center text-white">
      <h2>{titulo}</h2>
      </div>
    <div className="imagen-pelicula">
      <img src={imagen} alt={`Poster de ${titulo}`} className="w-full rounded-md" />
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
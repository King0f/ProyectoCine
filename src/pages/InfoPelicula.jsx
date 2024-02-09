import React, { useEffect } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import FavBottom from '../components/FavBottom';
import BuyBottom from '../components/BuyBottom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneFilm} from '../slices/Thunks';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function InfoPelicula() {
  const { id } = useLoaderData();
  const dispatch = useDispatch();
  const {oneFilm} = useSelector( state => state.films)



  useEffect(() => {
      dispatch(getOneFilm(id));
  }, [id]);

  if (!oneFilm) {
    return <p>Cargando detalles de la película...</p>;
  }
  const titulo = oneFilm.title;
  const año = oneFilm.release_date;
  const duracion = oneFilm.runtime;
  const descripcion = oneFilm.overview;
  const idiomaOriginal = oneFilm.original_language;
  const paisesProduccion = oneFilm.production_countries?.map(pais => pais.name).join(', ');
  const estudiosProduccion = oneFilm.production_companies?.map(empresa => empresa.name).join(', ');
  const imagenURLBase = "https://image.tmdb.org/t/p/w500";
  const imagen = oneFilm.poster_path ? `${imagenURLBase}${oneFilm.poster_path}` : 'URL_de_una_imagen_alternativa';
  const valoracion = oneFilm.vote_average?.toFixed(1);
  const generos = oneFilm.genres?.map(genre => genre.name).join(', ');
  const actores = oneFilm.credits?.cast.slice(0, 5).map(actor => actor.name).join(', ');
  const popularidad = oneFilm.popularity;
  const ingresos = oneFilm.revenue;
  const video = oneFilm.videos?.results[0]?.key;
    
  
  const formatearFecha = (fecha) => {
    const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', opcionesFecha);
    return fechaFormateada;
  };

  const formatearDuracion = (duracionEnMinutos) => {
    const horas = Math.floor(duracionEnMinutos / 60);
    const minutos = duracionEnMinutos % 60;
    return `${horas} hora y ${minutos} minutos`;
  };

  const formatearIdioma = (codigoIdioma) => {
    // Puedes extender este mapeo según tus necesidades
    const idiomas = {
      en: 'Inglés',
      es: 'Español',
      fr: 'Francés',
      de: 'Alemán',
      // Agrega más idiomas según sea necesario
    };

    return idiomas[codigoIdioma] || codigoIdioma;
  };
  
  return (
    <div className="contenedor-pelicula bg-gray-800">
    <div className="titulo-pelicula text-center">
      <h2><b>{titulo}</b></h2>
    </div>
    <div className="contenido-pelicula ml-6 mr-6">
      <div className="imagen-pelicula">
        <img src={imagen} alt={`Poster de ${titulo}`} />
      </div>
      <div className="info-pelicula">
        <div className="columna">
          <div className="detalle-pelicula">
            <h3><b>Fecha de Salida</b></h3>
            <p>{formatearFecha(año)}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Duración</b></h3>
            <p>{formatearDuracion(duracion)}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Idioma original</b></h3>
            <p>{formatearIdioma(idiomaOriginal)}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Paises de producción</b></h3>
            <p>{paisesProduccion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Ingresos</b></h3>
            <p>{ingresos?.toLocaleString()}$</p>
          </div>
        </div>
        <div className="columna">
        <div className="detalle-pelicula">
            <h3><b>Estudios de producción</b></h3>
            <p>{estudiosProduccion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Valoración</b></h3>
            <p>{valoracion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Géneros</b></h3>
            <p>{generos}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Actores</b></h3>
            <p>{actores}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Popularidad</b></h3>
            <p>{popularidad} visualizaciones</p>
          </div>
        </div>
      </div>
    </div>
    <div className="buttonContainer">
            <FavBottom
              id={id}
              titulo={titulo}
              imagen={imagen}
              valoracion={valoracion}
              generos={generos}
            />
            <Link to={`/ComprarEntrada/${id}`}>
            <BuyBottom />
            </Link>
          </div>
    <div className="text-center mb-4 pb-4">
      <h3 className=" text-center mb-2 text-3xl"><b>Sinopsis</b></h3>
      <p className="mx-auto max-w-4xl">{descripcion}</p>
    </div>
    {video && (
        <div className="trailer-pelicula mt-10">
          <h3 className="text-center text-3xl mb-4"><b>Tráiler</b></h3>
          <div className="flex justify-center">
            <iframe
              width="900"
              height="500"
              src={`https://www.youtube.com/embed/${video}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        )}
  </div>
  );
}

export default InfoPelicula;

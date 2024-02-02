import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import FavBottom from '../components/FavBottom';
import BuyBottom from '../components/BuyBottom';

export async function loader({ params }) {
  const id = params.id;
  return { id };
}

function InfoPelicula() {
  const { id } = useLoaderData();
  const [detallesPelicula, setDetallesPelicula] = useState(null);
  const [trailerId, setTrailerId] = useState(null);



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
            año: formatearFecha(data.release_date),
            duracion: formatearDuracion(data.runtime),
            descripcion: data.overview,
            idiomaOriginal: formatearIdioma(data.original_language),
            paisesProduccion: data.production_countries.map(pais => pais.name).join(', '),
            estudiosProduccion: data.production_companies.map(empresa => empresa.name).join(', '),
            imagen: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            valoracion: data.vote_average.toFixed(1),
            generos: data.genres.map(genre => genre.name).join(', '),
            actores: data.credits.cast.slice(0, 5).map(actor => actor.name).join(', '),
            popularidad: data.popularity,
            ingresos: data.revenue,
          });

          // Obtener el ID del tráiler si existe
          const videoResults = data.videos.results;
          if (videoResults && videoResults.length > 0) {
            setTrailerId(videoResults[0].key);
          }
        } else {
          console.error('No se encontraron detalles para la película con ID:', id);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
      }
    };

    obtenerDetallesPelicula();
  }, [id]);

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
  if (!detallesPelicula) {
    return <p>Cargando detalles de la película...</p>;
  }
  return (
    <div className="contenedor-pelicula bg-gray-800">
    <div className="titulo-pelicula text-center">
      <h2><b>{detallesPelicula.titulo}</b></h2>
    </div>
    <div className="contenido-pelicula ml-6 mr-6">
      <div className="imagen-pelicula">
        <img src={detallesPelicula.imagen} alt={`Poster de ${detallesPelicula.titulo}`} />
      </div>
      <div className="info-pelicula">
        <div className="columna">
          <div className="detalle-pelicula">
            <h3><b>Fecha de Salida</b></h3>
            <p>{detallesPelicula.año}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Duración</b></h3>
            <p>{detallesPelicula.duracion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Idioma original</b></h3>
            <p>{detallesPelicula.idiomaOriginal}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Paises de producción</b></h3>
            <p>{detallesPelicula.paisesProduccion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Ingresos</b></h3>
            <p>{detallesPelicula.ingresos.toLocaleString()}$</p>
          </div>
        </div>
        <div className="columna">
        <div className="detalle-pelicula">
            <h3><b>Estudios de producción</b></h3>
            <p>{detallesPelicula.estudiosProduccion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Valoración</b></h3>
            <p>{detallesPelicula.valoracion}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Géneros</b></h3>
            <p>{detallesPelicula.generos}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Actores</b></h3>
            <p>{detallesPelicula.actores}</p>
          </div>
          <div className="detalle-pelicula">
            <h3><b>Popularidad</b></h3>
            <p>{detallesPelicula.popularidad} visualizaciones</p>
          </div>
        </div>
      </div>
    </div>
    <div className="buttonContainer">
            <FavBottom />
            <Link to={`/ComprarEntrada/${id}`}>
            <BuyBottom />
            </Link>
          </div>
    <div className="text-center mb-4 pb-4">
      <h3 className=" text-center mb-2 text-3xl"><b>Sinopsis</b></h3>
      <p className="mx-auto max-w-4xl">{detallesPelicula.descripcion}</p>
    </div>
    {trailerId && (
        <div className="trailer-pelicula mt-10">
          <h3 className="text-center text-3xl mb-4"><b>Tráiler</b></h3>
          <div className="flex justify-center">
            <iframe
              width="900"
              height="500"
              src={`https://www.youtube.com/embed/${trailerId}`}
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

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import PeliculasSlider from '../components/PeliculasSlider';

function Inicio() {
  const [peliculasPopulares, setPeliculasPopulares] = useState([]);

  useEffect(() => {
    const obtenerMejoresPeliculasTerror = async () => {
      const apiKey = 'fcb629248cfa9804d5e0c9dec95073b5';
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`; // El ID 27 corresponde al género "Terror"
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPeliculasPopulares(data.results);
      } catch (error) {
        console.error('Error al obtener las mejores películas de terror:', error);
      }
       
    };
    obtenerMejoresPeliculasTerror();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  return (
    <div>
    <div className="bg-gray-800 text-white">
    <PeliculasSlider/>
    <h2 className="text-2xl font-bold mb-4 text-center">Descubre nuestras mejores peliculas de terror</h2>
    <Slider {...settings} className="border-solid border-2 border-gray-700"> {/* Estilos actualizados para el Slider */}
      {peliculasPopulares.map(pelicula => (
        <div key={pelicula.id} className="relative">
          <img 
            src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} 
            alt={pelicula.title} 
            className="w-full h-[36rem] object-fill" 
          />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center">
                <h3 className="text-white text-xl mb-2">{pelicula.title}</h3>
                <h3 className="text-white text-xl mb-2">Año: {pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'Desconocido'}</h3>
                <Link to={`/InfoPelicula/${pelicula.id}`}>
                <button class="botonInicio">
                <span>Ver Datos</span>
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
}

export default Inicio;

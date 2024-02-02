import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PeliculaCard = ({ pelicula }) => {
  const [hovered, setHovered] = useState(false);
  const [generos, setGeneros] = useState([]);
  const [actores, setActores] = useState([]);


  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const route = "/InfoPelicula/" + pelicula.id;
  const imgUrl = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`; // TMDb usa rutas relativas para las imágenes
  useEffect(() => {
    // Obtener géneros
    const obtenerGeneros = async () => {
      try {
        const apiKey = 'fcb629248cfa9804d5e0c9dec95073b5';
        const url = `https://api.themoviedb.org/3/movie/${pelicula.id}?api_key=${apiKey}&language=es-ES`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.genres) {
          setGeneros(data.genres);
        }
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    // Obtener actores
    const obtenerActores = async () => {
      try {
        const apiKey = 'fcb629248cfa9804d5e0c9dec95073b5';
        const url = `https://api.themoviedb.org/3/movie/${pelicula.id}/credits?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cast) {
          setActores(data.cast);
        }
      } catch (error) {
        console.error('Error al obtener actores:', error);
      }
    };

    obtenerGeneros();
    obtenerActores();
  }, [pelicula.id]);

  return (
    <div className={`bg-black max-w-sm rounded-lg overflow-hidden shadow-lg pelicula-card ${hovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={route}>
        <div className="relative">
          <img
            className={`w-full h-[32rem] object-cover transform ${hovered ? 'rotateY-180' : 'rotateY-0'}`}
            src={imgUrl}
            alt={pelicula.title}
          />
          <div className={`p-4 pelicula-details absolute top-0 left-0 right-0 bottom-0 ${hovered ? 'show' : ''}`}>
            <p className="font-bold text-xl mb-2">{pelicula.title}</p>
            <p><b>Año</b></p> 
            <p>{pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'Desconocido'}</p>
            <p><b>Género:</b></p> 
            <p>{generos.map(genre => genre.name).join(', ')}</p>
            <p><b>Valoración</b></p> 
            <p>{pelicula.vote_average ? pelicula.vote_average : 'N/A'}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};


function Peliculas() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=fcb629248cfa9804d5e0c9dec95073b5&language=es-ES&query=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.results) {
        setSearchResults(data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      setSearchResults([]);
    }
  };

  const obtenerPeliculasMejorValoradas = async () => {
    try {
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=fcb629248cfa9804d5e0c9dec95073b5&language=es-ES`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Error al obtener películas mejor valoradas:', error);
    }
  };
  
  useEffect(() => {
    obtenerPeliculasMejorValoradas();
  }, []);

  return (
    <div className="bg-gray-800">
    <div className="container mx-auto">
    <div className="mb-2">  
    <div>
  <h2 className="text-center text-3xl font-semibold mb-4 text-white pt-4">Descubre todo nuestro catálogo</h2>
  <div className="flex items-center border border-gray-300 rounded-md">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Ingrese el título de la película"
      className="w-full px-4 py-2 rounded-md rounded-r-none"
    />
    <button onClick={handleSearch} className="px-4 py-2 bg-blue-900 text-white rounded-md rounded-l-none">
      Buscar
    </button>
  </div>
</div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((pelicula) => (
          <PeliculaCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
      <br />
    </div>
    </div>
  );
}

export default Peliculas

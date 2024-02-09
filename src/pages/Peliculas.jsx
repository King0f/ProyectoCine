import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchFilms} from '../slices/Thunks';

const PeliculaCard = ({ pelicula}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const route = "/InfoPelicula/" + pelicula.id;
  const imgUrl = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`; // TMDb usa rutas relativas para las imágenes

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
  const dispatch = useDispatch();
  const {searchFilms} = useSelector( state => state.films)

  const handleSearch = async () => {
    dispatch(getSearchFilms(searchQuery));
  };

  
  useEffect(() => {
    dispatch(getSearchFilms());
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
        {searchFilms.map((pelicula) => (
          <PeliculaCard key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
      <br />
    </div>
    </div>
  );
}

export default Peliculas

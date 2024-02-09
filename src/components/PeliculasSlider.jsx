import React, { useEffect} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from '../slices/Thunks';

function PeliculasSlider() {
  const dispatch = useDispatch();
  const {films} = useSelector( state => state.films)

  useEffect(() => {
    dispatch(getFilms());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    adaptiveHeight: true
  };

  return (
    <div className="h-screen">
      <Slider {...settings}>
        {films?.map((pelicula) => (
          <div key={pelicula.id} className="h-[92vh] flex items-center justify-start relative object-fill">
            <div 
              className="h-full w-full bg-cover bg-center absolute" 
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${pelicula.backdrop_path})` }}
            ></div>
            <div className="absolute left-0 top-0 bottom-0 w-5/6 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="flex items-center h-full w-full">
            <div className="text-left ml-10 lg:ml-32 space-y-4 text-white p-10 relative z-20">
                <h2 className="text-4xl font-bold">{pelicula.title}</h2>
                <p className="text-xl max-w-md">{pelicula.overview}</p>
                <br/>
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
  );
}

export default PeliculasSlider;

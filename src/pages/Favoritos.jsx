import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';    
const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const favoritosGuardados = JSON.parse(localStorage.getItem('Favoritos')) || [];
        setFavoritos(favoritosGuardados);
    }, []);

    return (
        <div className="p-4 text-center">
             <h2 className="text-center text-3xl font-semibold mb-4 text-white pt-4">Todas las peliculas favoritas</h2>
            <div className="flex flex-wrap -m-2">
                {favoritos.length > 0 ? (
                    favoritos.map((fav, index) => (
                        <div key={index} className="p-6 w-full sm:w-3/4 md:w-1/3 lg:w-1/4">
                            <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                                <img src={fav.imagen} alt={`Imagen de ${fav.titulo}`} className="w-full h-[32rem] object-cover" />
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold">{fav.titulo}</h3>
                                    <p><b>Valoración:</b></p>
                                    <p>{fav.valoracion}</p>
                                    <p><b>Géneros:</b></p>
                                    <p>{fav.generos}</p>
                                    <Link to={`/InfoPelicula/${fav.id}`}>
                                    <button class="botonInicio">
                                    <span>Comprar</span>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                    ))
                ) : (
                    <p>No has comprado favoritos aún.</p>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
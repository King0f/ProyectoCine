import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';    
const MisEntradas = () => {
    const [entradas, setEntradas] = useState([]);

    useEffect(() => {
        const entradasGuardadas = JSON.parse(localStorage.getItem('EntradasCompradas')) || [];
        setEntradas(entradasGuardadas);
    }, []);

    return (
        <div className="p-4 text-center">
             <h2 className="text-center text-3xl font-semibold mb-4 text-white pt-4">Todas las entradas compradas:</h2>
            <div className="flex flex-wrap -m-2">
                {entradas.length > 0 ? (
                    entradas.map((entrada, index) => (
                        <div key={index} className="p-6 w-full sm:w-3/4 md:w-1/3 lg:w-1/4">
                            <Link to={`/InfoPelicula/${entrada.id}`}>
                            <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                                <img src={entrada.imagen} alt={`Imagen de ${entrada.titulo}`} className="w-full h-[34rem] object-cover" />
                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-semibold">{entrada.titulo}</h3>
                                    <p>Hora: {entrada.hora}</p>
                                    <p>Entradas: {entrada.entradas}</p>
                                    <p>Precio: {entrada.precio}€</p>
                                </div>
                            </div>
                            </Link>
                        </div>
                        
                    ))
                ) : (
                    <p>No has comprado entradas aún.</p>
                )}
            </div>
        </div>
    );
};

export default MisEntradas;
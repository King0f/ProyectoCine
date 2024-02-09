const apiKey = 'fcb629248cfa9804d5e0c9dec95073b5';

export const peliculasTerror = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27`
    return fetch(url);
}

export const peliculasGeneral = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`
    return fetch(url);
}

export const peliculasBuscar = (searchQuery) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fcb629248cfa9804d5e0c9dec95073b5&language=es-ES&query=${encodeURIComponent(searchQuery)}`;
    return fetch(url);
}

export const peliculasIndividual = (searchQuery) => {
    const url = `https://api.themoviedb.org/3/movie/${searchQuery}?api_key=${apiKey}&language=es-ES&append_to_response=credits,videos`;
    return fetch(url)
}
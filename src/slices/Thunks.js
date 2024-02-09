import { peliculasBuscar, peliculasTerror, peliculasIndividual } from "../services/Films"
import { peliculasGeneral } from "../services/Films"
import { setFilms, setHorrorFilms, setSearchFilms, setOneFilm } from "./Slice"


export const getFilms = () => {
    return async (dispatch, getState) => {

        try {
            const res = await peliculasGeneral();

            if (!res.ok) {

            }
            const data = await res.json();
            const films = data.results;
            console.log(films)


            dispatch(setFilms({ films: films }))

        } catch (error) {
            
        }

    }
}

export const getHorrorFilms = () => {
    return async (dispatch, getState) => {

        try {
            const res = await peliculasTerror();

            if (!res.ok) {

            }
            const data = await res.json();
            const films = data.results;
            console.log(films)


            dispatch(setHorrorFilms({ horrorFilms: films }))

        } catch (error) {
            
        }

    }
}
export const getSearchFilms = (keywords) => {
    return async (dispatch, getState) => {

        try {
            if(keywords == null){
                const res = await peliculasGeneral();
                if (!res.ok) {
    
                }
                const data = await res.json();
                const films = data.results;
                console.log(films)
    
    
                dispatch(setSearchFilms({ searchFilms: films }))
            }else{

                const res = await peliculasBuscar(keywords);

                if (!res.ok) {
    
                }
                const data = await res.json();
                const films = data.results;
                console.log(films)
    
    
                dispatch(setSearchFilms({ searchFilms: films }))
            }

        } catch (error) {
            
        }

    }
}

export const getOneFilm = (keywords) => {
    return async (dispatch, getState) => {

        try {
            const res = await peliculasIndividual(keywords);

                if (!res.ok) {
    
                }
                const data = await res.json();
                const films = data;
                console.log(films)
    
    
                dispatch(setOneFilm({ oneFilm: films }))
            

        } catch (error) {
            
        }

    }
}
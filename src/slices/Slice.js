import { createSlice } from '@reduxjs/toolkit'

export const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    horrorFilms: [],
    searchFilms: [],
    oneFilm: [],
  },
  reducers: {
    startLoadingFilms: (state) => {
      state.isLoading = true;
    },
    setFilms: (state, action) => {
      console.log(action)
      console.log(state)
      
      state.films = action.payload.films
    },
    setHorrorFilms: (state, action) => {
      console.log(action)
      console.log(state)
      
      state.horrorFilms = action.payload.horrorFilms
    },
    setSearchFilms: (state, action) => {
      console.log(action)
      console.log(state)
      
      state.searchFilms = action.payload.searchFilms
    },
    setOneFilm: (state, action) => {
      console.log(action)
      console.log(state)
      
      state.oneFilm = action.payload.oneFilm
    },
    otherAction: (state) => {
      console.log(state)
    }
  },
})


export const {startLoadingFilms, setHorrorFilms, setFilms, setOneFilm, setSearchFilms, otherAction } = filmsSlice.actions
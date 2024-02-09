import { configureStore } from '@reduxjs/toolkit'
import { filmsSlice } from '../slices/Slice'

export default configureStore({
  reducer: {
    films: filmsSlice.reducer,
  },
})
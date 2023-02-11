import { configureStore } from '@reduxjs/toolkit';
import {
  moviesReducer,
  setMovies,
  changeSearch,
  setGenres,
  setDirectors,
} from './slices/moviesSlice';
import { userReducer, setUser } from './slices/userSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export { store, setMovies, changeSearch, setUser, setGenres, setDirectors };

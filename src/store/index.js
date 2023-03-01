import { configureStore } from '@reduxjs/toolkit';
import {
  moviesReducer,
  setMovies,
  changeSearch,
  setGenres,
  setDirectors,
} from './slices/moviesSlice';
import {
  userReducer,
  setUser,
  changeEmail,
  changePassword,
  deleteUser,
  addFav,
  deleteFav,
} from './slices/userSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export {
  store,
  setMovies,
  changeSearch,
  setGenres,
  setDirectors,
  setUser,
  changeEmail,
  changePassword,
  deleteUser,
  addFav,
  deleteFav,
};

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
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

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export {
  store,
  persistor,
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

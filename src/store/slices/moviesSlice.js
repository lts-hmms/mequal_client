import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesList: [],
    search: '',
    genreList: [],
    directorList: [],
  },
  reducers: {
    setMovies(state, action) {
      state.moviesList = action.payload;
    },
    changeSearch(state, action) {
      state.search = action.payload;
    },
    setGenres(state, action) {
      state.genreList = action.payload;
    },
    setDirectors(state, action) {
      state.directorList = action.payload;
    },
  },
});

export const { setMovies, changeSearch, setGenres, setDirectors } =
  moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;

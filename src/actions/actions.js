/* eslint-disable no-console */
export const SET_MOVIES = 'SET_MOVIES';
export const SET_GENRES = 'SET_GENRES';
export const SET_DIRECTORS = 'SET_DIRECTORS';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_FAVORITE = 'SET_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export function setMovies(value) {
  console.log('SET_MOVIES action triggered');
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setGenres(value) {
  console.log('SET_GENRES action triggered');
  return {
    type: SET_GENRES,
    value,
  };
}

export function setDirectors(value) {
  console.log('SET_DIRECTORS action triggered');
  return {
    type: SET_DIRECTORS,
    value,
  };
}

export function setFilter(value) {
  console.log('SET_FILTER action triggered');
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(value) {
  console.log('SET_USER action triggered');
  return {
    type: SET_USER,
    value,
  };
}

export function updateUser(password, email) {
  console.log('UPDATE_USER action triggered');
  return {
    type: UPDATE_USER,
    payload: {
      password,
      email,
    },
  };
}

export function deleteUser(value) {
  console.log('DELETE_USER action triggered');
  return {
    type: DELETE_USER,
    value,
  };
}

export function setFavorite(value) {
  console.log('SET_FAVORITE action triggered');
  return {
    type: SET_FAVORITE,
    value,
  };
}

export function deleteFavorite(value) {
  console.log('DELETE_FAVORITE action triggered');
  return {
    type: DELETE_FAVORITE,
    value,
  };
}

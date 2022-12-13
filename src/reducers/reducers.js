/* eslint-disable no-console */
/* eslint-disable default-param-last */
import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_GENRES,
  SET_DIRECTORS,
  SET_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_FAVORITE,
  DELETE_FAVORITE,
} from '../actions/actions';

// reducer functions: if concerned by action, it changes state / takes state and action and returns new state
// here string bec. of 'show' or 'hide'
const visibilityFilter = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      console.log('SET_FILTER reducer reached');
      return action.value;
    default:
      return state;
  }
};

// diff. action types like SET_MOVIES, DELETE_MOVIE, ADD_MOVIE would all be under this reducer func
// state has to be array of obj. cause each movie is an obj.
const movies = (state = [], action) => {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
};

const genres = (state = [], action) => {
  switch (action.type) {
    case SET_GENRES:
      console.log('SET_GENRES reducer reached');
      return action.value;
    default:
      return state;
  }
};

const directors = (state = [], action) => {
  switch (action.type) {
    case SET_DIRECTORS:
      console.log('SET_DIRECTORS reducer reached');
      return action.value;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.value;
    case UPDATE_USER:
      console.log('UPDATE_USER reducer reached');
      return { password: action.payload.password, email: action.payload.email };
    case DELETE_USER:
      console.log('DELETE_USER reducer reached');
      return action.value;
    case SET_FAVORITE:
      console.log('SET_FAVORITE reducer reached');
      return {
        ...state,
        Favslist: [action.value, ...state.Favslist],
      };
    case DELETE_FAVORITE:
      console.log('DELETE_FAVORITE reducer reached');
      return {
        ...state,
        Favslist: [
          ...state.Favslist.filter((movieId) => movieId !== action.value),
        ],
      };
    default:
      return state;
  }
};

// combined reducer with Redux built-in function
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  genres,
  directors,
  user,
});

export default moviesApp;

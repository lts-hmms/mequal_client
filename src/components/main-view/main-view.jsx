import React, { useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setUser, setDirectors, setGenres } from '../../store';

import { MoviesList } from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavsView } from '../favs-view/favs-view';

import './main-view.scss';

export function MainView() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.moviesList);
  const user = useSelector((state) => state.user);
  const genres = useSelector((state) => state.movies.genreList);
  const directors = useSelector((state) => state.movies.directorsList);

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const onLoggedIn = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    dispatch(setUser(authData.user));
  };

  const getMovies = () => {
    axios
      .get('https://mequal.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGenres = () => {
    axios
      .get('https://mequal.herokuapp.com/genres/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setGenres(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDirectors = () => {
    axios
      .get('https://mequal.herokuapp.com/directors/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setDirectors(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token !== null) {
      getMovies(token);
      getDirectors(token);
      getGenres(token);
    }
  }, [token]);

  return (
    <Router>
      <NavbarView />
      <Container>
        <Row className="main-view">
          <Routes>
            <Route
              path="/"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <MoviesList />
                )
              }
            />
            <Route
              path="/users/:username/favs"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <FavsView />
                )
              }
            />
            {/* registration */}
            <Route
              path="/register"
              element={username ? <Navigate to="/" /> : <RegistrationView />}
            />
            {/* profile */}
            <Route
              path="/users/:username/profile"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <Container>
                    <ProfileView />
                  </Container>
                )
              }
            />
            {/* certain movie */}
            <Route
              path="/movies/:movieId"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <MovieView />
                )
              }
            />
            {/* certain director */}
            <Route
              path="/directors/:directorName"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <Col md={8}>
                    <DirectorView />
                  </Col>
                )
              }
            />
            {/* certain genre */}
            <Route
              path="/genres/:genreName"
              element={
                !username ? (
                  <LoginView
                    onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                  />
                ) : (
                  <Col md={8}>
                    <GenreView />
                  </Col>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}

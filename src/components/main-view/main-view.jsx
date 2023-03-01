/* eslint-disable react/prop-types */
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
import {
  setMovies,
  setUser,
  setDirectors,
  setGenres,
  changeSearch,
} from '../../store';

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

    /* the moment a user logs in, GET request to 'movies endpoint */
    // getMovies(authData.token);
    // dispatch(setGenres(authData.token));
    // dispatch(setDirectors(authData.token));
  };

  const getMovies = (token) => {
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

  useEffect(() => {
    if (token !== null) {
      getMovies(token);
      getDirectors(token);
      getGenres(token);
      // getUser(token);
    }
  }, [token]);

  /* When a user successfully logs in, this function updates the `user` property in store and main-view is rendered again */
  /* authentication data is saved to localStorage */

  // const getUser = (token, username) => {
  //   // const token = localStorage.getItem('token');
  //   // const username = localStorage.getItem('username');
  //   axios
  //     .get(`https://mequal.herokuapp.com/users/${username}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       dispatch(setUser(res.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getGenres = (token) => {
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

  const getDirectors = (token) => {
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

  return (
    <Router>
      <NavbarView />
      <Container>
        <Row className="main-view">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {
                    !user.Username ? (
                      <Col>
                        <LoginView
                          onLoggedIn={(authResponse) =>
                            onLoggedIn(authResponse)
                          }
                        />
                      </Col>
                    ) : (
                      <MoviesList />
                    )

                    // if (movies.length === 0) return <div className="main-view" />;
                    // return ;
                  }
                </>
              }
            />
            {/* Favorites */}
            <Route
              path="/users/:username/favs/"
              element={
                !user.Username ? (
                  <Col>
                    <LoginView
                      onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                    />
                  </Col>
                ) : (
                  <Col>
                    <FavsView />
                  </Col>
                )
              }
            />
            {/* registration */}
            <Route
              path="/register"
              element={
                user.Username ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <RegistrationView />
                  </Col>
                )
              }
            />
            {/* profile */}
            <Route
              path="/users/:username/profile"
              element={
                !user.Username ? (
                  <Col>
                    <LoginView
                      onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                    />
                  </Col>
                ) : (
                  <Container>
                    <Col>
                      <ProfileView />
                    </Col>
                  </Container>
                )
              }
            />
            {/* certain movie */}
            <Route
              path="/movies/:movieId"
              element={
                !user.Username ? (
                  <Col>
                    <LoginView
                      onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                    />
                  </Col>
                ) : (
                  // if (movies.length === 0) return <div className="main-view" />;
                  <MovieView />
                )
              }
            />
            {/* certain director */}
            <Route
              path="/directors/:directorName"
              element={
                !user.Username ? (
                  <Col>
                    <LoginView
                      onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                    />
                  </Col>
                ) : (
                  // if (movies.length === 0) return <div className="main-view" />;
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
                !user.Username ? (
                  <Col>
                    <LoginView
                      onLoggedIn={(authResponse) => onLoggedIn(authResponse)}
                    />
                  </Col>
                ) : (
                  // if (movies.length === 0) return <div className="main-view" />;
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

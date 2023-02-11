/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
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
    console.log(authData);
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
      getUser(token);
      getMovies(token);
      getDirectors(token);
      getGenres(token);
    }
  }, [token]);

  // const { movies, user, genres, directors } = props;
  // const username = localStorage.getItem('username');
  // console.log(username);
  // console.log(user);

  /* retrieves information from local storage and checks if user is logged in, if yes GET request is made to movies endpoint by calling getMovies method */
  // componentDidMount() {
  //   const accessToken = localStorage.getItem('token');

  //   if (accessToken !== null) {
  //     console.log('access reached');
  //     this.getUser(accessToken);
  //     this.getMovies(accessToken);
  //     // this.setFavorite(accessToken);
  //     this.getGenres(accessToken);
  //     this.getDirectors(accessToken);
  //   }
  // }

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('token');
  //   if (accessToken !== null) {
  //     getUser(accessToken);
  //     console.log('getUser reached');
  //   }
  //   if (user !== null && movies.length === 0) {
  //     getMovies(accessToken);
  //     console.log('getMovies reached');
  //   }
  // }, []);

  /* When a user successfully logs in, this function updates the `user` property in store and main-view is rendered again */
  /* authentication data is saved to localStorage */

  const getUser = (token, username) => {
    // const token = localStorage.getItem('token');
    // const username = localStorage.getItem('username');
    axios
      .get(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                    !user ? (
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
                !username ? (
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
                user ? (
                  <Redirect to="/" />
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
                !username ? (
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
                !username ? (
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
                !username ? (
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
                !username ? (
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

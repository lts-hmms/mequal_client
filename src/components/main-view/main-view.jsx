import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import {
  setMovies,
  setUser,
  setGenres,
  setDirectors,
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import FavsView from '../favs-view/favs-view';
// import mequalLogo from '../mequalLogo.png';

import './main-view.scss';

const MainView = (props) => {
  const { movies, user, genres, directors } = props;
  const username = localStorage.getItem('username');
  console.log(username);
  console.log(user);

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

  /* When a user successfully logs in, this function updates the `user` property in store and main-view is rendered again */
  /* authentication data is saved to localStorage */
  const onLoggedIn = (authData) => {
    console.log(authData);
    props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.Username);
    localStorage.setItem('user', authData.user);

    /* the moment a user logs in, GET request to 'movies endpoint */
    getMovies(authData.token);
    getGenres(authData.token);
    getDirectors(authData.token);
  };

  const getUser = (token) => {
    // const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .get(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.props.setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMovies = (token) => {
    axios
      .get('https://mequal.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        props.setMovies(response.data);
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
        props.setGenres(res.data);
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
        props.setDirectors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Router>
      <NavbarView username={username} />
      <Container>
        {/* <Row>
            <Img src="./mequalLogo.png" />
          </Row> */}
        <Row className="main-view">
          <Route
            exact
            path="/"
            render={() => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }}
          />
          {/* Favorites */}
          <Route
            path="/users/:user/favs/"
            render={() => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return (
                <Col>
                  <FavsView movies={movies} user={user} />
                </Col>
              );
            }}
          />
          {/* registration */}
          <Route
            path="/register"
            render={() => {
              if (username) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          {/* profile */}
          <Route
            path="/users/:user/profile"
            render={() => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return (
                <Container>
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                </Container>
              );
            }}
          />
          {/* certain movie */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                />
              );
            }}
          />
          {/* certain director */}
          <Route
            path="/directors/:directorName"
            render={({ match, history }) => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={directors.find(
                      (d) => d.Name === match.params.directorName
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* certain genre */}
          <Route
            path="/genres/:genreName"
            render={({ match, history }) => {
              if (!username)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={genres.find(
                      (g) => g.Name === match.params.genreName
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Container>
    </Router>
  );
};
// func allows comp (MainView) to subscribe to store updates, anytime store is updated, this func will be called
// #7
const mapStateToProps = (state) => ({
  user: state.user,
  movies: state.movies,
  genres: state.genres,
  directors: state.directors,
});

// Higher Order Comp: function that takes comp and returns new comp
// {setMovies} is mapDispatchToProps
// #8
export default connect(mapStateToProps, {
  setUser,
  setMovies,
  setGenres,
  setDirectors,
})(MainView);

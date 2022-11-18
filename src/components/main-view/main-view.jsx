import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Row, Col, Container } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import mequalLogo from '../mequalLogo.png';
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    // 'registers' class MainView as a React Component
    super();
    // initializing state with starting values
    this.state = {
      movies: [],
      user: null,
    };
  }

  /* retrieves information from local storage and checks if user is logged in, if yes GET request is made to movies endpoint by calling getMovies method */
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state and main-view is rendered again */
  /* authentication data is saved to localStorage */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    /* the moment a user logs in, GET request to 'movies endpoint */
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get('https://mequal.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result of the state
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <Col md={4} key={m._id}>
                    <div className="movie-cards mt-5">
                      <MovieCard movieData={m} />
                    </div>
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:user"
              render={({ history }) => (
                // if (!user) return <Redirect to="/" />;
                <Col>
                  <ProfileView user={user} />
                </Col>
              )}
            />

            {/* <Route
              path="users/:user/favs"}
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <UserFavsView />
                  </Col>
                );
              }}
            /> */}

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
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

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genres.Name === match.params.name)
                          .Genre
                      }
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
  }
}

export default MainView;

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Row, Col, Container, Img } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// import mequalLogo from '../mequalLogo.png';
import './main-view.scss';

export class MainView extends React.Component {
  constructor(props) {
    // 'registers' class MainView as a React Component
    super(props);
    // initializing state with starting values
    this.state = {
      movies: [],
      user: null,
      genres: [],
      directors: [],
      Favslist: [],
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
      this.getUser(accessToken);
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
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
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
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

  getUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .get(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          Favslist: res.data.Favslist,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getGenres(token) {
    axios
      .get('https://mequal.herokuapp.com/genres/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          genres: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDirectors(token) {
    axios
      .get('https://mequal.herokuapp.com/directors/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          directors: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToFavs(e) {
    const { movie } = this.props;
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    e.preventDefault();
    axios
      .post(`https://mequal.herokuapp.com/users/${user}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`Movie added to your Favs <3`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { movies, genres, directors, user, Favslist } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          {/* <Row>
            <Img src="./mequalLogo.png" />
          </Row> */}
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
                      <MovieCard
                        movieData={m}
                        genreData={genres}
                        directorData={directors}
                      />
                    </div>
                  </Col>
                ));
              }}
            />
            {/* Favorites */}
            <Route
              path="/users/:user/favs/"
              render={() => (
                <div className="Favslist row justify-content-center mt-5">
                  <h1 className="display-1 text-center">Your Favs</h1>
                  {Favslist.map((m) => {
                    const res = movies.filter((movie) => movie._id === m._id);
                    if (res.length > 0) {
                      return res.map((m) => (
                        <Col md={4} key={m._id}>
                          <div className="movie-cards mt-5">
                            <MovieCard movieData={m} />
                          </div>
                        </Col>
                      ));
                    }
                  })}
                </div>
              )}
            />
            {/* registration */}
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
            {/* profile */}
            <Route
              path="/users/:user/profile"
              render={({ history }) => (
                // not working for now
                // if (!user) return <Redirect to="/" />;
                <Container>
                  <Col>
                    <ProfileView user={user} movies={movies} />
                  </Col>
                </Container>
              )}
            />
            {/* certain movie */}
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
            {/* certain director */}
            <Route
              path="/directors/:directorName"
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
  }
}

export default MainView;

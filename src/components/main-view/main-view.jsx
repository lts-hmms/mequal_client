/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Row, Col, Container, Img } from 'react-bootstrap';
// #0
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

// #1
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

// import mequalLogo from '../mequalLogo.png';
import './main-view.scss';

// #2
class MainView extends React.Component {
  constructor(props) {
    // 'registers' class MainView as a React Component
    super(props);

    // initializing state with starting values
    // #3
    // this.state = {
    //   // movies: [],
    //   // user: null,
    //   genres: [],
    //   directors: [],
    //   // Favslist: [],
    // };
  }

  /* retrieves information from local storage and checks if user is logged in, if yes GET request is made to movies endpoint by calling getMovies method */
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      console.log('access reached');
      this.getMovies(accessToken);
      this.getUser(accessToken);
      // this.setFavorite(accessToken);
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://mequal.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result of the state

        // before redux:
        // this.setState({movies: response.data,});
        // with redux:
        // #4
        this.props.setMovies(response.data);
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
        // this.setState({
        // res.data.Favslist,
        //   });
        this.props.setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in store and main-view is rendered again */
  /* authentication data is saved to localStorage */
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);
    // or?: this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    /* the moment a user logs in, GET request to 'movies endpoint */
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
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

  render() {
    // with redux: movies is extracted from this.props rather than from the this.state
    // #5
    const { movies, user, toggleFavs } = this.props;
    // const { genres, directors } = this.state;
    const username = user.Username;

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
                if (movies.length === 0 && localStorage.getItem('user'))
                  return <div className="main-view" />;
                if (!username)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={(username) => this.onLoggedIn(username)}
                      />
                    </Col>
                  );

                // before redux:
                // movies.map((m) => (
                //   <Col md={4} key={m._id}>
                //     <div className="movie-cards mt-5">
                //       <MovieCard movieData={m} />
                //     </div>
                //   </Col>
                // ));
                // with redux:
                // #6
                return <MoviesList movies={movies} toggleFavs={toggleFavs} />;
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
                            <MovieCard
                              movieData={m}
                              handleFavs={this.handleFavs}
                            />
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
              render={() => {
                if (!user)
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
// func allows comp (MainView) to subscribe to store updates, anytime store is updated, this func will be called
// #7
const mapStateToProps = (state) => ({ movies: state.movies, user: state.user });

// Higher Order Comp: function that takes comp and returns new comp
// {setMovies} is mapDispatchToProps
// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

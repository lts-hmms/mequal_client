import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Row, Col, Container, Button } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';

import mequalLogo from '../mequalLogo.png';
import './main-view.scss';

export class MainView extends React.Component {
        constructor() {
                // 'registers' class MainView as a React Component
                super();
                // initializing state with starting values
                this.state = {
                        movies: [],
                        selectedMovie: null,
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

        /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
        setSelectedMovie(newSelectedMovie) {
                this.setState({ selectedMovie: newSelectedMovie });
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

        getMovies(token) {
                axios.get('https://mequal.herokuapp.com/movies', { headers: { Authorization: `Bearer ${token}` } })
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

        onLoggedOut() {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.setState({
                        user: null,
                });
        }

        render() {
                const { movies, selectedMovie, user } = this.state;

                /* If there's no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
                if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

                /* Before the movies have been loaded */
                if (movies.length === 0) return <div className="main-view" />;

                return (
                        <Router>
                                <div>
                                        <NavbarView />
                                        {/* If the state of `selectedMovie`is not null, than selected movie will be returned, otherwise all movies will be returned */}
                                        <Container>
                                                <Row>
                                                        <Route
                                                                path="/movies/:movieId"
                                                                render={({ match }) => (
                                                                        <Col md={8}>
                                                                                <MovieView
                                                                                        movie={movies.find(
                                                                                                (m) =>
                                                                                                        m._id ===
                                                                                                        match.params
                                                                                                                .movieId
                                                                                        )}
                                                                                />
                                                                        </Col>
                                                                )}
                                                        />
                                                </Row>
                                        </Container>
                                        <Container>
                                                <Row className="row">
                                                        <Route
                                                                exact
                                                                path="/"
                                                                render={() =>
                                                                        movies.map((m) => (
                                                                                <Col md={4} key={m._id}>
                                                                                        <div className="movie-cards mt-5">
                                                                                                <MovieCard
                                                                                                        movieData={m}
                                                                                                />
                                                                                        </div>
                                                                                </Col>
                                                                        ))
                                                                }
                                                        />
                                                </Row>
                                        </Container>
                                </div>
                        </Router>
                );
        }
}

export default MainView;

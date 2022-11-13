import React from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavbarView } from '../navbar/navbar';
import mequalLogo from '../mequalLogo.png';

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

        componentDidMount() {
                axios.get('https://mequal.herokuapp.com/movies')
                        .then((response) => {
                                this.setState({
                                        movies: response.data,
                                });
                        })
                        .catch((error) => {
                                console.log(error);
                        });
        }

        /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
        setSelectedMovie(newSelectedMovie) {
                this.setState({ selectedMovie: newSelectedMovie });
        }

        /* When a user successfully logs in, this function updates the `user` property in state to that particular user */
        onLoggedIn(user) {
                this.setState({
                        user,
                });
        }

        render() {
                const { movies, selectedMovie, user } = this.state;

                /* If there's no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
                if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

                /* Before the movies have been loaded */
                if (movies.length === 0) return <div className="main-view" />;

                return (
                        <div>
                                <NavbarView />
                                {/* If the state of `selectedMovie`is not null, than selected movie will be returned, otherwise all movies will be returned */}
                                {selectedMovie ? (
                                        <Container>
                                                <Row>
                                                        <MovieView
                                                                movie={selectedMovie}
                                                                onBackClick={(newSelectedMovie) => {
                                                                        this.setSelectedMovie(newSelectedMovie);
                                                                }}
                                                        />
                                                </Row>
                                        </Container>
                                ) : (
                                        <Container>
                                                <Row className="row justify-content-center mt-5">
                                                        <Col md={3}>
                                                                <img
                                                                        className="logo "
                                                                        src={mequalLogo}
                                                                        alt="mequal logo"
                                                                        style={{ width: '100%' }}
                                                                />
                                                        </Col>
                                                </Row>
                                                <Row className="row">
                                                        {movies.map((movie) => (
                                                                <Col md={4}>
                                                                        <div className="movie-cards mt-5">
                                                                                <MovieCard
                                                                                        key={movie._id}
                                                                                        movieData={movie}
                                                                                        onMovieClick={(
                                                                                                newSelectedMovie
                                                                                        ) => {
                                                                                                this.setSelectedMovie(
                                                                                                        newSelectedMovie
                                                                                                );
                                                                                        }}
                                                                                />
                                                                        </div>
                                                                </Col>
                                                        ))}
                                                </Row>
                                        </Container>
                                )}
                        </div>
                );
        }
}

export default MainView;

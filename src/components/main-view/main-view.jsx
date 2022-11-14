import React from 'react';
import axios from 'axios';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
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
        axios
            .get('https://mequal.herokuapp.com/movies', { headers: { Authorization: `Bearer ${token}` } })
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
            <div>
                <NavbarView />
                {/* If the state of `selectedMovie`is not null, than selected movie will be returned, otherwise all movies will be returned */}
                {selectedMovie ? (
                    <Container>
                        <Row>
                            <MovieView
                                className="movie-view"
                                movie={selectedMovie}
                                onBackClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Row>
                    </Container>
                ) : (
                    <Container>
                        <Row className="row">
                            <Col md={5}>
                                <Button
                                    className="btn mt-3"
                                    variant="dark"
                                    type="submit"
                                    onClick={() => {
                                        this.onLoggedOut();
                                    }}
                                >
                                    Logout
                                </Button>
                            </Col>
                        </Row>
                        <Row className="row justify-content-center mt-5">
                            <Col md={3}>
                                <img className="logo " src={mequalLogo} alt="mequal logo" style={{ width: '100%' }} />
                            </Col>
                        </Row>

                        <Row className="row">
                            {movies.map((movie) => (
                                <Col md={4} key={movie._id}>
                                    <div className="movie-cards mt-5">
                                        <MovieCard
                                            movieData={movie}
                                            onMovieClick={(newSelectedMovie) => {
                                                this.setSelectedMovie(newSelectedMovie);
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

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Badge, Container } from 'react-bootstrap';

export class MovieCard extends React.Component {
        render() {
                const { movieData, onMovieClick } = this.props;
                return (
                        <Card>
                                <Card.Img
                                        className="movie-im"
                                        variant="link"
                                        src={movieData.ImageUrl}
                                        onClick={() => onMovieClick(movieData)}
                                />
                                <Card.Body className="cardbody text-center">
                                        <Card.Text>
                                                {movieData.Genres.map((genre) => (
                                                        <Badge pill bg="light" text="dark">
                                                                {genre.Name}
                                                        </Badge>
                                                ))}
                                        </Card.Text>
                                        <Card.Title className="movieTitle mt-4" onClick={() => onMovieClick(movieData)}>
                                                {movieData.Title}
                                        </Card.Title>
                                        <Card.Text>{movieData.Year}</Card.Text>
                                        <Card.Text>
                                                {movieData.Directors.map((director) => (
                                                        <div>by {director.Name}</div>
                                                ))}
                                        </Card.Text>

                                        <Button className="btn mt-2 justify-content-center" variant="dark">
                                                +
                                        </Button>
                                </Card.Body>
                        </Card>
                );
        }
}

MovieCard.propTypes = {
        movieData: PropTypes.shape({
                Title: PropTypes.string.isRequired,
                Year: PropTypes.number.isRequired,
                ImageUrl: PropTypes.string.isRequired,
                Featured: PropTypes.bool.isRequired,
                Description: PropTypes.string,
                Genres: PropTypes.array.isRequired,
                Actors: PropTypes.array.isRequired,
                Directors: PropTypes.array.isRequired,
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired,
};

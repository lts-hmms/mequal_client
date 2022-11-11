import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
        render() {
                const { movieData, onMovieClick } = this.props;
                return (
                        <Card>
                                <Card.Img variant="top" src={movieData.ImageUrl} />
                                <Card.Body>
                                        <Card.Title>{movieData.Title}</Card.Title>
                                        <Card.Text>{movieData.Description}</Card.Text>
                                        <Button onClick={() => onMovieClick(movieData)} variant="link">
                                                Open
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

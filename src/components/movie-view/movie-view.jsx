import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col } from 'react-bootstrap';

export class MovieView extends React.Component {
        render() {
                const { movie, onBackClick } = this.props;
                const { Genres, Directors, Actors } = movie;
                return (
                        <Row>
                                <Col md={8} className="movietext sm-12 my-auto">
                                        <h2 className="movie-title mt-5">
                                                <span className="value">{movie.Title}</span>
                                        </h2>
                                        <h5 className="movie-year">
                                                <span className="value">{movie.Year}</span>
                                        </h5>
                                        <div className="movie-directors">
                                                <span className="label">Directors: </span>
                                                <span className="value">
                                                        {Directors.map(({ _id, Name }) => (
                                                                <span key={Name}>{Name}, </span>
                                                        ))}
                                                </span>
                                        </div>
                                        <div className="movie-description">
                                                <span className="label">Description: </span>
                                                <span className="value">{movie.Description}</span>
                                        </div>
                                        <div className="movie-genres">
                                                <span className="label">Genres: </span>
                                                <span className="value">
                                                        {Genres.map(({ Name }) => (
                                                                <span key={Name}>{Name}, </span>
                                                        ))}
                                                </span>
                                        </div>
                                        <div className="movie-actors">
                                                <span className="label">Actors: </span>
                                                <span className="value">
                                                        {Actors.map(({ Name }) => (
                                                                <span key={Name}>{Name}, </span>
                                                        ))}
                                                </span>
                                        </div>
                                        <Button variant="dark" className="btn mt-3" onClick={() => onBackClick(null)}>
                                                Go back!
                                        </Button>
                                </Col>
                                <Col md={4}>
                                        <div className="movie-poster mt-5">
                                                <img
                                                        alt="movie poster"
                                                        style={{ width: '125%' }}
                                                        src={movie.ImageUrl}
                                                />
                                        </div>
                                </Col>
                        </Row>
                );
        }
}

MovieView.propTypes = {
        movie: PropTypes.shape({
                Title: PropTypes.string.isRequired,
                Year: PropTypes.number.isRequired,
                Description: PropTypes.string.isRequired,
                ImageUrl: PropTypes.string.isRequired,
                Genres: PropTypes.array.isRequired,
                Actors: PropTypes.array.isRequired,
                Directors: PropTypes.array.isRequired,
        }).isRequired,
        onBackClick: PropTypes.func.isRequired,
};

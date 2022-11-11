import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
        render() {
                const { movie, onBackClick } = this.props;
                const { Genres, Directors, Actors } = movie;
                return (
                        <div className="movie-view">
                                <div className="movie-poster">
                                        <img alt="movie poster" style={{ width: '200px' }} src={movie.ImageUrl} />
                                </div>
                                <div className="movie-title">
                                        <span className="label">Title: </span>
                                        <span className="value">{movie.Title}</span>
                                </div>
                                <div className="movie-year">
                                        <span className="label">Year: </span>
                                        <span className="value">{movie.Year}</span>
                                </div>
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
                                                {Genres.map(({ _id, Name }) => (
                                                        <span key={Name}>{Name}, </span>
                                                ))}
                                        </span>
                                </div>
                                <div className="movie-actors">
                                        <span className="label">Actors: </span>
                                        <span className="value">
                                                {Actors.map(({ _id, Name }) => (
                                                        <span key={Name}>{Name}, </span>
                                                ))}
                                        </span>
                                </div>
                                <button onClick={() => onBackClick(null)}>Go back!</button>
                        </div>
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

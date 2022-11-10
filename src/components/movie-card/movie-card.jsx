import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
        render() {
                <button type="button">Registration</button>;

                const { movieData, onMovieClick } = this.props;
                return (
                        <div
                                className="movie-card"
                                onClick={() => {
                                        onMovieClick(movieData);
                                }}
                        >
                                {movieData.Title}
                        </div>
                );
        }
}

MovieCard.propTypes = {
        movieData: PropTypes.shape({
                Title: PropTypes.string.isRequired,
                Year: PropTypes.number.isRequired,
                ImageUrl: PropTypes.string.isRequired,
                Featured: PropTypes.bool.isRequired,
                Genres: PropTypes.array.isRequired,
                Actors: PropTypes.array.isRequired,
                Directors: PropTypes.array.isRequired,
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired,
};

import React from 'react';

import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

function FavsView(props) {
  const { movies, user } = props;
  const { favslist } = user;
  console.log(user);
  console.log(props);

  return (
    <div className="Favslist row justify-content-center my-5">
      <div className="text-center">
        <h1 className="display-1">Your Favs</h1>
        <h2>💜</h2>
      </div>

      {favslist?.map((m) => {
        const res = movies.filter((movie) => movie._id === m._id);
        if (res.length > 0) {
          return res.map((m) => (
            <Col md={3} key={m._id}>
              <div className="movie-cards mt-5">
                <MovieCard movie={m} user={user} />
              </div>
            </Col>
          ));
        }
      })}
    </div>
  );
}

FavsView.propTypes = {
  movies: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Description: PropTypes.string,
    Genres: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
    Directors: PropTypes.array.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    favslist: PropTypes.array.isRequired,
  }).isRequired,
  toggleFavs: PropTypes.func.isRequired,
};

export default FavsView;

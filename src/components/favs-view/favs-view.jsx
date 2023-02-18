import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export function FavsView() {
  const movies = useSelector((state) => state.movies.moviesList);
  const user = useSelector((state) => state.user);

  return (
    <div className="Favslist row justify-content-center my-5">
      <div className="text-center">
        <h1 className="display-1">Your Favs</h1>
        <h2>💜</h2>
      </div>

      {user.Favslist?.map((m) => {
        const res = movies.filter((movie) => movie._id === m);
        if (res.length > 0) {
          return res.map((m) => (
            <Col md={4} key={m._id}>
              <div className="movie-cards mt-5">
                <MovieCard movie={m} />
              </div>
            </Col>
          ));
        }
      })}
    </div>
  );
}

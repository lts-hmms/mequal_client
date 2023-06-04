import React from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';

// array movies can be filtered based on value present in visibilityFilter, the render filtered array
export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.moviesList);

  const visibilityFilter = useSelector(
    (state) => state.movies.search
  ).toLowerCase();
  const filteredMovies = movies.filter((m) =>
    m.Title.toLowerCase().includes(visibilityFilter)
  );

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col className="mt-4 col-md-12">
        <VisibilityFilterInput />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={4} key={m._id}>
          <div className="movie-cards mt-5 mb-5">
            <MovieCard movie={m} />
          </div>
        </Col>
      ))}
    </>
  );
};

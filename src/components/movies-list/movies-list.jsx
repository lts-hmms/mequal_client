import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// moviesLists props contain two properties: 2nd being movies which was passed in render mainView
// array movies can be filtered based on value present in visibilityFilter, the render filtered array
function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={4} key={m._id}>
          <div className="movie-cards mt-5">
            <MovieCard movie={m} />
          </div>
        </Col>
      ))}
    </>
  );
}

// mapsStateToProps func transforms the store into props that MoviesList comp will use
// in store is here visibilityFilter (transformed into prop)
export default connect(mapStateToProps)(MoviesList);

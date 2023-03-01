import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

export function MovieView() {
  const movies = useSelector((state) => state.movies.moviesList);
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  const navigate = useNavigate();

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
            {movie.Directors.map(({ Name }) => (
              <span key={Name}>
                <Link to={`/directors/${Name}`}>{Name}</Link>,{' '}
              </span>
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
            {movie.Genres.map(({ Name }) => (
              <span key={Name}>
                <Link to={`/genres/${Name}`}>{Name}</Link>,{' '}
              </span>
            ))}
          </span>
        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
          {movie.Actors.map(({ Name }) => (
            <span key={Name}>
              <Link to={`/actors/${Name}`}>{Name}</Link>,{' '}
            </span>
          ))}
        </div>
        <Button
          variant="dark"
          className="btn mt-3"
          onClick={() => navigate(-1)}
        >
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

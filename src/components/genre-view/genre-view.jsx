import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export function GenreView() {
  const movies = useSelector((state) => state.movies.moviesList);
  const genres = useSelector((state) => state.movies.genreList);
  const navigate = useNavigate();

  const { genreName } = useParams();
  const genreObj = genres.find((g) => g.Name === genreName);

  return (
    <Row>
      <Col className="genretext sm-12 my-auto mt-5">
        <h2 className="genre-name mt-5">
          <span className="value">{genreName}</span>
        </h2>
        <div className="genre-description mt-4">
          <span className="value">{genreObj.Description}</span>
        </div>
        <Button
          variant="dark"
          className="btn mt-3"
          onClick={() => navigate(-1)}
        >
          Go back!
        </Button>
      </Col>
    </Row>
  );
}

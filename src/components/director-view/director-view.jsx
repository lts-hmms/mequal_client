import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export function DirectorView() {
  // const { director, onBackClick } = this.props;
  const movies = useSelector((state) => state.movies.moviesList);
  const directors = useSelector((state) => state.movies.directorList);
  const navigate = useNavigate();

  const { directorName } = useParams();
  const directorObj = directors.find((d) => d.Name === directorName);

  return (
    <Row>
      <Col className="directortext sm-12 my-auto mt-5">
        <h2 className="director-name mt-5">
          <span className="value">{directorName}</span>
        </h2>
        <h5 className="director-birth">
          <span className="value">*{directorObj.Birthyear}</span>
        </h5>
        <div className="genre-description mt-4">
          <span className="value">{directorObj.Bio}</span>
        </div>
        {/* <div className="director-movies">
            <span className="label">Movies: </span>
            <span className="value">
            </span>
          </div> */}

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

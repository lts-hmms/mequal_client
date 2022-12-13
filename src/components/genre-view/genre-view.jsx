import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    return (
      <Row>
        <Col className="genretext sm-12 my-auto mt-5">
          <h2 className="genre-name mt-5">
            <span className="value">{genre.Name}</span>
          </h2>
          <div className="genre-description mt-4">
            <span className="value">{genre.Description}</span>
          </div>
          {/* <div className="genre-movies">
            <span className="label">Movies: </span>
            <span className="value">
            </span>
          </div> */}

          <Button
            variant="dark"
            className="btn mt-3"
            onClick={() => onBackClick(null)}
          >
            Go back!
          </Button>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

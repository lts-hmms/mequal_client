import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Row>
        <Col className="directortext sm-12 my-auto mt-5">
          <h2 className="director-name mt-5">
            <span className="value">{director.Name}</span>
          </h2>
          <h5 className="director-birth">
            <span className="value">*{director.Birthyear}</span>
          </h5>
          <div className="genre-description mt-4">
            <span className="value">{director.Bio}</span>
          </div>
          {/* <div className="director-movies">
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

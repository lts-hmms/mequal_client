import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Badge, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;

    return (
      <Card>
        <Link to={`/movies/${movieData._id}`}>
          <Card.Img
            className="movie-im"
            variant="top"
            src={movieData.ImageUrl}
          />
        </Link>
        <Card.Body className="cardbody text-center">
          <Card.Text>
            {movieData.Genres.map((genre) => (
              <Link to={`/genres/${movieData.Genres.Name}`}>
                <Badge pill variant="link" bg="light" text="dark">
                  {genre.Name}
                </Badge>
              </Link>
            ))}
          </Card.Text>
          <Card.Title className="movieTitle mt-4">{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Year}</Card.Text>
          <Card.Text>
            {movieData.Directors.map((director) => (
              <Link to={`/directors/${movieData.Directors.Name}`}>
                <div>by {director.Name}</div>
              </Link>
            ))}
          </Card.Text>

          <Button className="btn mt-2 justify-content-center" variant="dark">
            +
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.number.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Description: PropTypes.string,
    Genres: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
    Directors: PropTypes.array.isRequired,
  }).isRequired,
};

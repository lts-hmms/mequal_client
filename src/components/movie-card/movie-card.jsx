import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Badge, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class MovieCard extends React.Component {
  addToFavs(movieId) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios
      .post(`https://mequal.herokuapp.com/users/${user}/movies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`Movie added to your favs <3`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { movieData, genreData } = this.props;

    return (
      <Container>
        <Row className="row justify-content-center mt-5">
          <Card>
            <Link to={`/movies/${movieData._id}`}>
              <Card.Img
                className="movie-im"
                variant="top"
                src={movieData.ImageUrl}
                alt="movieposter"
              />
            </Link>
            <Card.Body className="cardbody text-center">
              <Card.Text>
                {movieData.Genres.map((genre) => (
                  <Link to={`/genres/${genre.Name}`}>
                    <Badge pill variant="link" bg="light" text="dark">
                      {genre.Name}
                    </Badge>
                  </Link>
                ))}
              </Card.Text>
              <Card.Title className="movieTitle mt-4">
                {movieData.Title}
              </Card.Title>
              <Card.Text>{movieData.Year}</Card.Text>
              <Card.Text>
                {movieData.Directors.map((director) => (
                  <Link to={`/directors/${director.Name}`}>
                    <div>by {director.Name}</div>
                  </Link>
                ))}
              </Card.Text>

              <Button
                onClick={this.addToFavs}
                className="btn mt-2 justify-content-center"
                variant="dark"
              >
                +
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
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
  genreData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired,
};

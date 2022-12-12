import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FavsButton from '../favs-button/favs-button';
import './movie-card.scss';

export function MovieCard({ movie, toggleFavs, user }) {
  return (
    <Container>
      <Row className="row justify-content-center mt-5">
        <Card>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              className="movie-im"
              variant="top"
              src={movie.ImageUrl}
              alt="movieposter"
            />
          </Link>
          <Card.Body className="cardbody text-center">
            <Card.Text>
              {movie.Genres.map((genre) => (
                <Link to={`/genres/${genre.Name}`}>
                  <Badge pill variant="link" bg="light" text="dark">
                    {genre.Name}
                  </Badge>
                </Link>
              ))}
            </Card.Text>
            <Card.Title className="movieTitle mt-4">{movie.Title}</Card.Title>
            <Card.Text>{movie.Year}</Card.Text>
            <Card.Text>
              {movie.Directors.map((director) => (
                <Link to={`/directors/${director.Name}`}>
                  <div>by {director.Name}</div>
                </Link>
              ))}
            </Card.Text>
            <FavsButton movie={movie} user={user} toggleFavs={toggleFavs} />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

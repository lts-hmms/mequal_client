import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavsButton } from '../favs-button/favs-button';
import './movie-card.scss';

export function MovieCard({ movie, toggleFavs }) {
  return (
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
            <Link to={`/genres/${genre.Name}`} key={genre._id}>
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
            <Link to={`/directors/${director.Name}`} key={director._id}>
              <span>by {director.Name}</span>
            </Link>
          ))}
        </Card.Text>
        <FavsButton movie={movie} toggleFavs={toggleFavs} />
      </Card.Body>
    </Card>
  );
}

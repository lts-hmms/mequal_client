import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Badge, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavsButton } from '../favs-button/favs-button';

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }

  render() {
    const { movieData, genreData } = this.props;

    const handleFavs = () => {
      console.log('movie data', movieData._id);
      this.setState((prevState) => ({
        isToggleOn: !prevState.isToggleOn,
      }));

      // const { user, Favslist } = this.state;
      // const token = localStorage.getItem('token');
      // if (token !== null && user !== null) {
      //   // Add MovieId to Favs (local state & server)
      //   if (action === '💜') {
      //     this.setState({ favs: [...Favslist, movieId] });
      //     axios
      //       .post(
      //         `https://mequal.herokuapp.com/users/${username}/movies/${movieId}`,
      //         {},
      //         {
      //           headers: { Authorization: `Bearer ${token}` },
      //         }
      //       )
      //       .then((res) => {
      //         console.log(`Movie added to ${user} favorite movies`);
      //         alert(`Movie added to your favs <3`);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });

      //     // Remove MovieId from Favorites (local state & server)
      //   } else if (action === '⛔️') {
      //     this.setState({
      //       favs: Favslist.filter((id) => id !== movieId),
      //     });
      //     axios
      //       .delete(
      //         `https://mequal.herokuapp.com/users/${user}/movies/${movieId}`,
      //         {
      //           headers: { Authorization: `Bearer ${token}` },
      //         }
      //       )
      //       .then((res) => {
      //         console.log(`Movie removed from ${user} favorite movies`);
      //         alert(`Movie removed from your favs!`);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
      // }
    };

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
              <FavsButton
                isToggleOn={this.state.isToggleOn}
                onClick={() => handleFavs}
              />
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

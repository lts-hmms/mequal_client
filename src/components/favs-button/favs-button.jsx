import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFavorite, deleteFavorite } from '../../actions/actions';

function FavsButton(props) {
  const { movie, user } = props;
  const username = user.Username;
  const { Favslist } = user;
  const isFav = Favslist.includes(movie._id);

  const toggleFavs = (movieId) => {
    const token = localStorage.getItem('token');
    // delete movie if exists
    if (isFav === true) {
      axios
        .delete(
          `https://mequal.herokuapp.com/users/${username}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          props.deleteFavorite(movieId);
          alert(`Movie removed from your favs!`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Add movie if not exists
    if (isFav === false) {
      axios
        .post(
          `https://mequal.herokuapp.com/users/${username}/movies/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          props.setFavorite(movieId);
          alert(`Movie added to your Favs <3`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Button
      className="favs-button btn mt-2 justify-content-center"
      variant="dark"
      onClick={() => toggleFavs(movie._id)}
    >
      {isFav ? '⛔️' : '💜'}
    </Button>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  toggleFavs: state.toggleFavs,
});

export default connect(mapStateToProps, { setFavorite, deleteFavorite })(
  FavsButton
);

FavsButton.propTypes = {
  button: PropTypes.shape({
    movie: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    Favslist: PropTypes.array.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

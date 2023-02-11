import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../../store/slices/userSlice';

export function FavsButton(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { movie } = props;

  const isFav = user.Favslist.includes(movie._id);

  const toggleFavs = (movieId) => {
    const token = localStorage.getItem('token');
    // delete movie if exists
    if (isFav === true) {
      axios
        .delete(
          `https://mequal.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          dispatch(deleteFav(movieId));
          alert(`Movie removed from your favs!`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Add movie if not exists
    if (isFav === false) {
      console.log(movieId);
      axios
        .post(
          `https://mequal.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          dispatch(addFav(movieId));
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

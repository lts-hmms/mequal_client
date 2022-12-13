import React from 'react';

import { Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

function FavsView(props) {
  const { movies } = props;
  const { user } = props;
  console.log(user);
  console.log(props);
  const favslist = user.Favslist;

  return (
    <div className="Favslist row justify-content-center my-5">
      <div className="text-center">
        <h1 className="display-1">Your Favs</h1>
        <h2>💜</h2>
      </div>

      {favslist?.map((m) => {
        const res = movies.filter((movie) => movie._id === m._id);
        if (res.length > 0) {
          return res.map((m) => (
            <Col md={3} key={m._id}>
              <div className="movie-cards mt-5">
                <MovieCard movie={m} user={user} />
              </div>
            </Col>
          ));
        }
      })}
    </div>
  );
}

export default FavsView;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { changeSearch } from '../../store/slices/moviesSlice';

export function VisibilityFilterInput() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.movies.searchTerm);

  const handleSearchTermChange = (event) => {
    dispatch(changeSearch(event.target.value));
  };

  return (
    <Form.Control
      onChange={handleSearchTermChange}
      value={searchTerm}
      placeholder="search"
      id="search-bar"
    />
  );
}

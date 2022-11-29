import React from 'react';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
// import { connect } from 'react-redux';
// import { VisibilityFilterInput } from '../visibility-filter-input/visibility-filter-input';

// const mapStateToProps = (state) => {
//   {
//     visibilityFilter;
//   }
// };

export function NavbarView({ username }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return false;
  };

  // const visibilityFilter = this.props;
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">mequal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {isAuth() && (
            <Nav.Link href={`/users/${username}/profile`}>{username}</Nav.Link>
          )}
          {isAuth() && (
            <Nav.Link href={`/users/${username}/favs`}>Favs</Nav.Link>
          )}
          {isAuth() && <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>}

          {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
        <Form className="d-flex">
          {/* <VisibilityFilterInput visibilityFilter={visibilityFilter} /> */}
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarView;
// export default connect(mapStateToProps)(NavbarView);

// export default connect(mapStateToProps, { setMovies } )(MainView);

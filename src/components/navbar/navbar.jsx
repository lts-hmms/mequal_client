import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function NavbarView() {
  const user = useSelector((state) => state.user);

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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          mequal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user.Username}/profile`}>
                {user.Username}
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user.Username}/favs`}>
                Favs
              </Nav.Link>
            )}
            {isAuth() && <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>}
            {!isAuth() && (
              <Nav.Link as={Link} to="/">
                Login
              </Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

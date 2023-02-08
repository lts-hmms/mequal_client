import React from 'react';
import { Container, Nav, Navbar, Form } from 'react-bootstrap';

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

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">mequal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${username}/profile`}>
                {username}
              </Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/users/${username}/favs`}>Favs</Nav.Link>
            )}

            {isAuth() && <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>}

            {!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

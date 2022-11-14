import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';

export function NavbarView() {
        return (
                <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand href="#home">mequal</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                        <Nav.Link href="#home">Home</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                                <NavDropdown.Item href="#action/3.1">Genres</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.2">Directors</NavDropdown.Item>
                                                <NavDropdown.Item href="#action/3.3">Actors</NavDropdown.Item>
                                        </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
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

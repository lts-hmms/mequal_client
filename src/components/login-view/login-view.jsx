import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';

export function LoginView(props) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(username, password);
                /* temporary till 3.6 */
                /* Send a request to the server for authentication */
                props.onLoggedIn(username);
        };

        return (
                <div className="Login mt-5">
                        <h1 className="display-1 text-center">Login</h1>
                        <div>
                                <h6 className="text-center">
                                        Not yet registered?
                                        <div className="btn-link justify-content-center">Subscribe</div>
                                </h6>
                        </div>
                        <div className="row justify-content-center mt-5">
                                <Col md={8} lg={6}>
                                        <Form>
                                                <Form.Group controlId="formUsername">
                                                        <Form.Label>Username:</Form.Label>
                                                        <Form.Control
                                                                type="text"
                                                                onChange={(e) => setUsername(e.target.value)}
                                                        />
                                                </Form.Group>
                                                <Form.Group controlId="formPassword">
                                                        <Form.Label>Password:</Form.Label>
                                                        <Form.Control
                                                                type="password"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                </Form.Group>
                                                <Col>
                                                        <Button
                                                                className="btn mt-3"
                                                                variant="dark"
                                                                type="submit"
                                                                onClick={handleSubmit}
                                                        >
                                                                Submit
                                                        </Button>
                                                </Col>
                                        </Form>
                                </Col>
                        </div>
                </div>
        );
}

LoginView.propTypes = {
        user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                password: PropTypes.string.isRequired,
        }),
        onLoggedIn: PropTypes.func.isRequired,
};

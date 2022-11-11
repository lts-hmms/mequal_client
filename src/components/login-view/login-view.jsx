import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                <Form>
                        <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Submit
                        </Button>
                </Form>
        );
}

LoginView.propTypes = {
        user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                password: PropTypes.string.isRequired,
        }),
};

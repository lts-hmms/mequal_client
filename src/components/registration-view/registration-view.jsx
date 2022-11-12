import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';

export function RegistrationView(props) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [email, setEmail] = useState[''];
        const [birthday, setBirthday] = useState[''];

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(username, password, email, birthday);
        };

        return (
                <div className="Register mt-5">
                        <h1 className="display-1 text-center">Register</h1>
                        <div>
                                <h6 className="text-center">
                                        You already have an account?
                                        <div className="btn-link justify-content-center">Login</div>
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
                                                <Form.Group controlId="formEmail">
                                                        <Form.Label>Email:</Form.Label>
                                                        <Form.Control
                                                                type="email"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                </Form.Group>
                                                <Form.Group controlId="formEmail">
                                                        <Form.Label>Birthday:</Form.Label>
                                                        <Form.Control
                                                                type="date"
                                                                onChange={(e) => setBirthday(e.target.value)}
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

RegistrationView.propTypes = {
        registration: PropTypes.shape({
                username: PropTypes.string.isRequired,
                password: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                birthday: PropTypes.string.isRequired,
        }),
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState[''];
    const [birthday, setBirthday] = useState[''];
    // hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState[''];
    const [birthdayErr, setBirthdayErr] = useState[''];

    // validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username required');
            isReq = false;
        } else if (username.length < 3) {
            setUsernameErr('Give me at least 3 characters please');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Give me at least 6 characters please');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email required');
            isReq = false;
        } else if (email.indexOf('@') === -1 && email.indexOf('.') === -1) {
            setPasswordErr("This doesn't look like an email to me ");
            isReq = false;
        }
        if (!birthday) {
            setBirthdayErr('Birthday required');
            isReq = false;
        }
        return isReq;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* send a post request to the server */
            axios
                .post('https://mequal.herokuapp.com/users', {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                })
                .then((response) => {
                    const { data } = response;
                    console.log(data);
                    alert('Registration successful, please login.');
                });
            /* second argument opens page in current tab */
            window
                .open('/', '_self')
                // needs response from server if username already exists
                .catch((response) => {
                    console.error(response);
                    alert('unable to register, please try again');
                });
        }
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
                            <Form.Label />
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label />
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label />
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailErr && <p>{emailErr}</p>}
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label />
                            <Form.Control
                                type="date"
                                placeholder="Enter birthday"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            {birthdayErr && <p>{birthdayErr}</p>}
                        </Form.Group>
                        <Col>
                            <Button className="btn mt-3" variant="dark" type="submit" onClick={handleSubmit}>
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

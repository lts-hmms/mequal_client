import React, { useState } from 'react';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isValid = true;
    if (!username || username.length < 5) {
      setUsernameErr('Username must be at least 5 characters');
      isValid = false;
    }
    if (!password || password.length < 8) {
      setPasswordErr('Password must be at least 8 characters');
      isValid = false;
    }
    return isValid;
  };

  // post request to login endpoint of API using Axios
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameErr('');
    setPasswordErr('');
    if (validate()) {
      login(username, password);
    }
  };

  const handleTestuser = () => {
    login('testuser', 'Testuser2023');
  };

  const login = (username, password) => {
    axios
      .post('https://mequal.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      // backend sends back token & username, they go to onLoggedIn function
      .then((response) => {
        const { data } = response;
        props.onLoggedIn(data);
      })
      .catch(() => {
        setUsernameErr('Username or Password is incorrect. Please try again.');
      });
  };

  return (
    <div className="container Login mt-5 justify-content-center text-center">
      <h1 className="display-1">Login</h1>
      <div>
        <div className="p-2">
          <div>Not yet registered?</div>
          <Link to="/register" className="btn-link">
            Subscribe
          </Link>
        </div>
        <div className="p-2">
          <div>Just here to look around and don't feel like signing up?</div>
          <Button
            className="p-0"
            variant="link"
            type="submit"
            onClick={handleTestuser}
          >
            Login with Testuser
          </Button>
        </div>
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
              {/* display validation error */}
              {usernameErr && <Alert variant="danger">{usernameErr}</Alert>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label />
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <Alert variant="danger">{passwordErr}</Alert>}
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

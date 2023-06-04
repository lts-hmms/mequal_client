import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Username has at least 3 characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password has at least 6 characters');
      isReq = false;
    }
    return isReq;
  };

  // post request to login endpoint of API using Axios
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
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
          alert('Username or Password is incorrect. Please try again.');
        });
    }
  };

  const handleTestuser = () => {
    axios
      .post('https://mequal.herokuapp.com/login', {
        Username: 'testuser',
        Password: 'Testuser2023',
      })
      // backend sends back token & username, they go to onLoggedIn function
      .then((response) => {
        const { data } = response;
        props.onLoggedIn(data);
      })
      .catch(() => {
        alert('Something went wrong. Please contact the admin.');
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

import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Give me at least 5 characters please');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Give me at least 8 characters please');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      setEmailErr("This doesn't look like an email ");
      isReq = false;
    }
    if (!birthday) {
      setBirthdayErr('Birthday required');
      isReq = false;
    }
    return isReq;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* send a post request to the server */
      try {
        const response = await axios.post(
          'https://mequal.herokuapp.com/users',
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          }
        );
        alert(
          'Successfully registered. You will now be redirected to the login page.'
        );
        window.open('/', '_self');
      } catch (e) {
        if (e.response.status === 400) {
          alert(`I am sorry but this went wrong: ${e.response.data}`);
        } else {
          alert(
            `I am sorry but this went wrong: Please check if you meet the requirements.`
          );
        }
      }
    }
  };

  return (
    <div className="container Register mt-5 justify-content-center text-center">
      <h1 className="display-1">Register</h1>
      <div>
        <div className="p-2">
          <div>You already have an account?</div>
          <Link to="/" className="btn-link">
            Login
          </Link>
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

              <Form.Text className="text-muted">
                Minimum of eight characters, at least one letter and one number
                – no special characters.
              </Form.Text>
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
            <Form.Group controlId="formBirthday">
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
              <Button
                className="btn mt-3"
                variant="dark"
                type="submit"
                onClick={handleRegister}
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

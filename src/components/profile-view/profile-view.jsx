import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import { changeEmail, changePassword, deleteUser } from '../../store';

export function ProfileView() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user input
  const validate = () => {
    let isReq = true;
    if (password && password.length < 8) {
      setPasswordErr('Give me at least 8 characters please.');
      isReq = false;
    }
    if (
      (email && email.indexOf('@') === -1) ||
      (email && email.indexOf('.') === -1)
    ) {
      setEmailErr("This doesn't look like an email to me.");
      isReq = false;
    }
    return isReq;
  };

  const deleteProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (user.Username && token) {
      const warningAlert = confirm(
        'Are you sure you want to permanently delete your account?'
      );
      if (!warningAlert) return;
      axios
        .delete(`https://mequal.herokuapp.com/users/${user.Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          localStorage.clear();
          alert('Profile has been deleted.');
          deleteUser();
          window.open('/', '_self');
        })
        .catch(() => {
          alert('Something went wrong. Please contact the admin.');
        });
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const isReq = validate();
    if (isReq) {
      axios
        .patch(
          `https://mequal.herokuapp.com/users/${user.Username}`,
          {
            Email: email || user.Email,
            ...(password ? { Password: password } : {}),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          alert('Your profile is updated now.');
          dispatch(changeEmail({ Email: res.data.Email }));
          dispatch(changePassword({ Password: res.data.Password }));
        })
        .catch(() => {
          alert(
            `I am sorry, this went wrong: Please check if you meet the requirements.`
          );
        });
    }
  };

  return (
    <div className="Profile mt-5">
      <h1 className="display-1 text-center">Profile</h1>

      <div className="row justify-content-center mt-5">
        <Col md={8} lg={6}>
          <h5 className="Username">
            <div className="value">Username:</div>
            <div className="text-secondary">{user.Username}</div>
          </h5>
          <h5 className="Birthday">
            <div className="value">Birthday: </div>
            <div className="text-secondary">
              <Moment format="YYYY-MM-DD">{user.Birthday}</Moment>
            </div>
          </h5>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label className="h5">Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
              <Form.Text className="text-muted">
                Minimum of eight characters, at least one letter and one number.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="h5">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder={user.Email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailErr && <p>{emailErr}</p>}
            </Form.Group>
            <Col>
              <Button
                className="btn mt-3"
                variant="dark"
                type="submit"
                onClick={updateUser}
              >
                Update profile
              </Button>
            </Col>
          </Form>
        </Col>
        <Row className="mt-5">
          <Col
            className="h6 text-center btn-link justify-content-center"
            onClick={deleteProfile}
          >
            Delete profile
          </Col>
        </Row>
      </div>
    </div>
  );
}

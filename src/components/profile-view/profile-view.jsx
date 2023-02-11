/* eslint-disable no-console */
import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';
import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
  const validate = () => {
    let isReq = true;
    if (password && password.length < 6) {
      setPasswordErr('Give me at least 6 characters please');
      isReq = false;
    }
    if (email && email.indexOf('@') === -1 && email.indexOf('.') === -1) {
      setEmailErr("This doesn't look like an email to me ");
      isReq = false;
    }
    return isReq;
  };

  const getUser = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .get(`https://mequal.herokuapp.com/users/${props.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.props.setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .delete(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Profile has been deleted.');
        deleteUser({});
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .patch(
        `https://mequal.herokuapp.com/users/${username}`,
        {
          Email: this.state.Email,
          ...(this.Password ? { Password: this.state.Password } : {}),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log('response', res);
        alert('Your profile is updated now.');
        this.setState({
          Password: res.data.Password,
          Email: res.data.Email,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleChangeEmail = (event) => {
    this.setState({ Email: event.target.value });
  };

  const handleChangePW = (event) => {
    this.setState({ Password: event.target.value });
  };

  return (
    <div className="Profile mt-5">
      <h1 className="display-1 text-center">Profile</h1>

      <div className="row justify-content-center mt-5">
        <Col md={8} lg={6}>
          <h5 className="Username">
            <div className="value">Username:</div>
            <div className="text-secondary">{props.username}</div>
          </h5>
          <h5 className="Birthday">
            <div className="value">Birthday: </div>
            <div className="text-secondary">
              <Moment format="YYYY-MM-DD">{props.birthday}</Moment>
            </div>
          </h5>
          <Form>
            <Form.Group controlId="formPassword">
              <Form.Label className="h5">Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="******"
                value={this.Password}
                onChange={this.handleChangePW}
              />

              {/* {PasswordErr && <p>{PasswordErr}</p>} */}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label className="h5">Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder={props.email}
                onChange={this.handleChangeEmail}
              />
              {/* {emailErr && <p>{emailErr}</p>} */}
            </Form.Group>
            <Col>
              <Button
                className="btn mt-3"
                variant="dark"
                type="submit"
                // eslint-disable-next-line react/jsx-no-bind
                // onClick={this.updateUser.bind(this)}
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

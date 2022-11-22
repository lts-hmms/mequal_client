import React from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: '',
      Email: '',
      Birthday: null,
      Favslist: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  validate() {
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
  }

  getUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios
      .get(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          Favslist: res.data.Favslist,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProfile(e) {
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
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser(e) {
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
  }

  handleChangeEmail = (event) => {
    this.setState({ Email: event.target.value });
  };

  handleChangePW = (event) => {
    this.setState({ Password: event.target.value });
  };

  render() {
    const { Birthday } = this.state;
    // const { movies } = this.props;
    const { user } = this.props;
    const { Email } = this.state;
    const { Password } = this.state;
    const { Favslist } = this.state;
    const FavsIds = Favslist.map((movie, key) => movie._id);
    const favsIds = [];

    return (
      <div className="Profile mt-5">
        <h1 className="display-1 text-center">Profile</h1>

        <div className="row justify-content-center mt-5">
          <Col md={8} lg={6}>
            <h5 className="Username">
              <div className="value">Username:</div>
              <div className="text-secondary">{user}</div>
            </h5>
            <h5 className="Birthday">
              <div className="value">Birthday: </div>
              <div className="text-secondary">
                <Moment format="YYYY-MM-DD">{Birthday}</Moment>
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
                  placeholder={Email}
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
                  onClick={this.updateUser.bind(this)}
                >
                  update profile
                </Button>
              </Col>
            </Form>
          </Col>
          <Row className="mt-5">
            <Link
              className="h6 text-center btn-link justify-content-center"
              onClick={this.deleteProfile}
            >
              Delete profile
            </Link>
          </Row>
        </div>

        <div className="Favslist row justify-content-center mt-5">
          {Favslist.map((m) => {
            const res = movies.filter((movie) => movie._id === m._id);
            if (res.length > 0) {
              return res.map((m) => (
                <Col md={4} key={m._id}>
                  <div className="movie-cards mt-5">
                    <MovieCard movieData={m} />
                  </div>
                </Col>
              ));
            }
          })}
        </div>
      </div>
    );
  }
}
export default ProfileView;

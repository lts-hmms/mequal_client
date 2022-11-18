import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Row, Col, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      Favs: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log(this.props);
  }

  getUser() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .get(`https://mequal.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favs: response.data.Favslist,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {
    const { user, Birthday } = this.props;
    const { Password, Email } = this.state;

    return (
      <div className="Profile mt-5">
        <h1 className="display-1 text-center">Profile</h1>

        <div className="row justify-content-center mt-5">
          <Col md={8} lg={6}>
            <Form>
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
              <Form.Group controlId="formPassword">
                <Form.Label className="h5">Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  value={this.Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* {passwordErr && <p>{passwordErr}</p>} */}
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="h5">Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={Email}
                  value={this.Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* {emailErr && <p>{emailErr}</p>} */}
              </Form.Group>
              <Col>
                <Button
                  className="btn mt-3"
                  variant="dark"
                  type="submit"
                  //   onClick={handleRegister}
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
}
export default ProfileView;

// export function ProfileView(props) {
//   const { user } = props;
//   const token = localStorage.getItem('token');

//    useEffect(() => {async function() {
//       const res = await axios.get(`https://mequal.herokuapp.com/users/${user}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     }}, [])

//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [birthday, setBirthday] = useState('');
//   // hook for each input
//   //   const [passwordErr, setPasswordErr] = useState('');
//   //   const [emailErr, setEmailErr] = useState('');
//   //   const [birthdayErr, setBirthdayErr] = useState('');

//   const [isDisabled, setIsDisabled] = useState(false);

//   const handleClick = () => {
//     setIsDisabled(isDisabled);
//   };

//   useEffect(() => {
//     async function fetchUser() {
//       const response = await fetch(
//         `https://mequal.herokuapp.com/users/${user}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       console.log(response);
//       setEmail(response.data);
//     }
//     fetchUser();
//   }, []);

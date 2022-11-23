import React from 'react';
import { Button } from 'react-bootstrap';

export class FavsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <Button
        className="btn mt-2 justify-content-center"
        variant="dark"
        onClick={this.handleClick}
      >
        {this.state.isToggleOn ? '💜' : '⛔️'}
      </Button>
    );
  }
}

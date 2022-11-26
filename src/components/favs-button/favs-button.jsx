import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class FavsButton extends React.Component {
  render() {
    return (
      <Button
        className="btn mt-2 justify-content-center"
        variant="dark"
        onClick={this.props.onClick}
      >
        {this.props.isToggleOn ? '💜' : '⛔️'}
      </Button>
    );
  }
}

FavsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

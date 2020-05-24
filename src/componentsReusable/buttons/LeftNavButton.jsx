import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function LeftNavButton({ text, initiallyDisabled }) {
  return (
    <Button
      onClick={() => window.history.back()}
      className="button action-button--navigation action-button--grey"
      disabled={initiallyDisabled}
    >
      {text}
    </Button>
  );
}

LeftNavButton.propTypes = {
  text: PropTypes.string.isRequired,
  initiallyDisabled: PropTypes.bool,
};

LeftNavButton.defaultProps = {
  initiallyDisabled: false,
};

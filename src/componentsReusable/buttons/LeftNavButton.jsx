import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function LeftNavButton({ text }) {
  return (
    <Button
      onClick={() => window.history.back()}
      className="button action-button--navigation action-button--grey"
    >
      {text}
    </Button>
  );
}

LeftNavButton.propTypes = {
  text: PropTypes.string.isRequired,
};

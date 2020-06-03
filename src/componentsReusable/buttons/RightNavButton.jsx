import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { isButtonDisabled } from '../../utils/helpers';

export default function RightNavButton({ text, location, handleClick }) {
  const inputs = useSelector((state) => state.inputs);

  return (
    <Button
      onClick={handleClick}
      className="button action-button--navigation action-button--blue"
      disabled={isButtonDisabled(location, inputs)}
    >
      {text}
    </Button>
  );
}

RightNavButton.propTypes = {
  text: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

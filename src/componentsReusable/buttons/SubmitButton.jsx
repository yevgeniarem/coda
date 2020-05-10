import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function SubmitButton({ text, classes }) {
  return (
    <Button type="submit" className={classNames('button', classes)}>
      {text}
    </Button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(PropTypes.string),
};

SubmitButton.defaultProps = {
  classes: [],
};

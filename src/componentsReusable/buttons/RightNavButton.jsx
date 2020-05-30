import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function RightNavButton({
  text,
  initiallyDisabled,
  location,
  judgeHandleClick,
}) {
  const inputs = useSelector((state) => state.inputs);
  const history = useHistory();

  const handleClick = () => {
    // TODO refactor so you dont have handleclick within button
    if (location === 'tourDates') history.push('/judges');
    if (location === 'judges') judgeHandleClick();
  };

  const isDisabled = () => {
    // TODO figure out why you cant delete the first line
    if (initiallyDisabled === false) return false;
    if (!inputs.judge || !inputs.position || !inputs.teacherJudge) return true;
    return false;
  };

  return (
    <Button
      onClick={handleClick}
      className="button action-button--navigation action-button--blue"
      disabled={isDisabled()}
    >
      {text}
    </Button>
  );
}

RightNavButton.propTypes = {
  text: PropTypes.string.isRequired,
  initiallyDisabled: PropTypes.bool,
  location: PropTypes.string.isRequired,
  judgeHandleClick: PropTypes.func,
};

RightNavButton.defaultProps = {
  initiallyDisabled: false,
  judgeHandleClick: null,
};

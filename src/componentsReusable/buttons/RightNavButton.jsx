import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { tryJudgeCheck } from '../../redux/actions/appActions';

export default function RightNavButton({ text, initiallyDisabled, location }) {
  const inputs = useSelector((state) => state.inputs);
  const history = useHistory();
  const dispatch = useDispatch();

  const checkJudge = async () => {
    try {
      const response = await dispatch(
        tryJudgeCheck({
          tourDateId: inputs.tourDateId,
          position: inputs.position,
        }),
      );
      if (!response.data) history.push('/scoring');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleClick = () => {
    if (location === 'tourDates') history.push('/judges');
    if (location === 'judges') checkJudge();
  };

  const isDisabled = () => {
    if (initiallyDisabled === false) return false;
    if (!inputs.judge || !inputs.position || !inputs.teacherJudge) {
      return true;
    }
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
};

RightNavButton.defaultProps = {
  initiallyDisabled: false,
};

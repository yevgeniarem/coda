import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { tryJudgeCheck } from '../../redux/actions/appActions';

export default function NavButtons({ button1, button2, disabled, location }) {
  const history = useHistory();
  const inputs = useSelector((state) => state.inputs);
  const { tourDateId, position } = useSelector((state) => state.inputs);
  const dispatch = useDispatch();

  const checkJudge = async () => {
    try {
      const response = await dispatch(tryJudgeCheck({ tourDateId, position }));
      if (!response.data) history.push('/scoring');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleClick = (e) => {
    if (e.target.value === 'BACK') window.history.back();
    if (e.target.value === 'NEXT') {
      if (location === 'tourDates') history.push('/judges');
      if (location === 'judges') checkJudge();
    }
  };

  const isDisabled = () => {
    if (disabled === false) return false;
    if (Object.values(inputs).find((e) => e === 'default')) return true;
    return false;
  };

  return (
    <div className="button-wrapper">
      <Button
        onClick={handleClick}
        className="button action-button--navigation action-button--grey"
        value={button1}
      >
        {button1}
      </Button>
      <Button
        onClick={handleClick}
        className="button action-button--navigation action-button--blue"
        value={button2}
        disabled={isDisabled()}
      >
        {button2}
      </Button>
    </div>
  );
}

NavButtons.propTypes = {
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

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

  // TODO separate buttons into left / right button components
  const buttons = [
    // TODO use classnames package, instead of classNames, use color property
    {
      value: button1,
      classNames: 'button action-button--navigation action-button--grey',
      disabled: false,
    },
    {
      value: button2,
      classNames: 'button action-button--navigation action-button--blue',
      disabled: isDisabled(),
    },
  ];

  return (
    <div className="button-wrapper">
      {buttons.map((b) => (
        <Button
          onClick={handleClick}
          className={b.classNames}
          value={b.value}
          disabled={b.disabled}
          key={b.value}
        >
          {b.value}
        </Button>
      ))}
    </div>
  );
}

NavButtons.propTypes = {
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

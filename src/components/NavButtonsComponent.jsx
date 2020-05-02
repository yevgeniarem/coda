import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { runJudgeModal } from '../redux/actions/appActions';

const NavButtonsComponent = ({ button1, button2, disabled, location }) => {
  const history = useHistory();
  const inputs = useSelector((state) => state.inputs);
  const dispatch = useDispatch();
  let pauseClick = false;

  const handleClick = (e) => {
    if (e.target.value === 'BACK') window.history.back();
    if (e.target.value === 'NEXT') {
      if (location === 'judges') {
        pauseClick = true;
        axios
          .get('https://api.d360test.com/api/coda/check-judge', {
            params: {
              tour_date_id: inputs.tourDateId,
              competition_group_id: 2,
              position: inputs.position,
            },
          })
          .then((response) => {
            dispatch(runJudgeModal(response.data));
            if (!response.data) history.push('/scoring');
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
      if (!pauseClick) {
        dispatch(runJudgeModal(''));
        history.push(
          `/Judge${parseInt(history.location.pathname.slice(-1), 10) + 1}`,
        );
      }
    }
  };

  const isDisabled = () => {
    if (disabled === 'notDisabled') return false;
    if (Object.values(inputs).find((e) => e === 'default')) {
      return true;
    }
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
};

NavButtonsComponent.propTypes = {
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default NavButtonsComponent;

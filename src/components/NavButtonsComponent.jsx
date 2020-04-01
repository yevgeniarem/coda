import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { runModal } from '../redux/actions/appActions';

const NavButtonsComponent = ({ button1, button2, disabled, location }) => {
  const history = useHistory();
  const inputs = useSelector(state => state.inputs);
  const dispatch = useDispatch();
  let pauseClick = false;

  const handleClick = e => {
    if (e.target.value === 'BACK') window.history.back();
    if (e.target.value === 'NEXT') {
      if (location === 'judge4') {
        pauseClick = true;
        axios
          .get('https://api.d360test.com/api/coda/check-judge', {
            params: {
              tour_date_id: inputs.tourDateId,
              competition_group_id: 2,
              position: inputs.position
            }
          })
          .then(function(response) {
            dispatch(runModal(response.data));
            if (!response.data) history.push('/Judge5');
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      if (!pauseClick)
        history.push(
          `/Judge${parseInt(history.location.pathname.slice(-1)) + 1}`
        );
    }
  };

  const isDisabled = () => {
    if (disabled === 'notDisabled') return false;
    if (Object.values(inputs).find(e => e === 'default')) {
      return true;
    } else {
      return false;
    }
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

export default NavButtonsComponent;

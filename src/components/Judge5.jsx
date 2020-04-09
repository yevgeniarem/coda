import React, { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoutineList } from '../redux/actions/appActions';
import axios from 'axios';

const Judge5 = () => {
  const dispatch = useDispatch();
  const inputs = useSelector(state => state.inputs);
  const eventId = useSelector(state => state.events.currentEvent.id);
  const { currentRoutine } = useSelector(state => state.routines);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios // routines and scores of a position
      .get(`https://api.d360test.com/api/coda/routines`, {
        params: {
          tour_date_id: inputs.tourDateId,
          competition_group_id: inputs.competitionGroup,
          position: inputs.position
        }
      })
      .then(function(response) {
        // console.log('routines: ', response);
        dispatch(updateRoutineList(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });

    axios // buttons
      .get('https://api.d360test.com/api/coda/buttons')
      .then(function(response) {
        // console.log('buttons: ', response);
        setButtons(
          response.data.find(
            buttons =>
              buttons.level_id === currentRoutine.performance_division_level_id
          ).level_4
        );
      })
      .catch(function(error) {
        console.log(error);
      });

    axios // data for scoring breakdown
      .get('https://api.d360test.com/api/coda/scoring-breakdown', {
        params: {
          event_id: eventId
        }
      })
      .then(function(response) {
        // console.log('scoring breakdown: ', response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [inputs, eventId, dispatch, currentRoutine.performance_division_level_id]);

  let allButtons = buttons.map(button => {
    if (button.header_level) {
      return (
        <button
          type="button"
          key={button.id}
          className={`button button--judging button--header-level-${button.header_level}`}
        >
          {button.header_name}
        </button>
      );
    }
    if (button.level_4_name === null && button.level_3_name) {
      return (
        <button
          type="button"
          key={button.id}
          className={`button button--judging button--scoring`}
        >
          {button.level_3_name}
        </button>
      );
    }
    if (button.level_4_name) {
      return (
        <button
          type="button"
          key={button.id}
          className={`button button--judging button--scoring`}
        >
          {button.level_4_name}
        </button>
      );
    }
  });

  let performanceButton = allButtons.find(
    button => button.props.children === 'Performance'
  );
  let foundationButtons = allButtons.splice(
    0,
    allButtons.indexOf(performanceButton)
  );

  console.log(window.innerHeight);

  return (
    <>
      <NavbarComponent type="scoreSheet" name="judge5" />
      <div className="button__container button__container--firstPage">
        {foundationButtons}
      </div>
      <div className="button__container button__container--secondPage">
        {allButtons}
      </div>
    </>
  );
};

export default Judge5;

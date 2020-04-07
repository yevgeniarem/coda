import React, { useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { updateRoutineList } from '../redux/actions/appActions';
import axios from 'axios';

const Judge5 = () => {
  const dispatch = useDispatch();
  const inputs = useSelector(state => state.inputs);
  const eventId = useSelector(state => state.events.currentEvent.id);

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
        console.log('routines: ', response);
        dispatch(updateRoutineList(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });

    axios // buttons
      .get('https://api.d360test.com/api/coda/buttons')
      .then(function(response) {
        console.log('buttons: ', response);
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
        console.log('scoring breakdown: ', response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [inputs, eventId, dispatch]);

  return (
    <div>
      <NavbarComponent type="scoreSheet" name="judge5" />
    </div>
  );
};

export default Judge5;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import SelectInputComponent from './SelectInputComponent';
import NavButtonsComponent from './NavButtonsComponent';
import axios from 'axios';
import { createEventCitiesList } from '../redux/actions/appActions';

const Judge3 = () => {
  const dispatch = useDispatch();
  const { currentEvent, eventCitiesList } = useSelector(state => state.events);

  useEffect(() => {
    axios
      .get(`https://api.d360test.com/api/coda/tour-dates`, {
        params: {
          event_id: currentEvent.id,
          season_id: currentEvent.seasonId
        }
      })
      .then(function(response) {
        dispatch(createEventCitiesList(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [currentEvent.id, currentEvent.seasonId, dispatch]);

  return (
    <div>
      <NavbarComponent type="chooseYourCity" text="CHOOSE YOUR CITY" />

      <div className="main-container">
        <Image
          className="img-event--big"
          src={`https://assets.dance360.com/coda/${currentEvent.id}.svg`}
          alt={`${currentEvent.name} logo`}
        />

        <div className="main-container__middle-container">
          <SelectInputComponent
            inputs={eventCitiesList}
            formatType="twoVar"
            name="CHOOSE YOUR CITY"
          />
        </div>

        <NavButtonsComponent button1="BACK" button2="NEXT" />
      </div>
    </div>
  );
};

export default Judge3;

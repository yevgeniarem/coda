import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import axios from 'axios';

import NavbarComponent from '../components/NavbarComponent';
import SelectInputComponent from '../components/SelectInputComponent';
import NavButtonsComponent from '../components/NavButtonsComponent';
import { createEventCitiesList } from '../redux/actions/appActions';
import CONST from '../utils/constants';

export default function TourDates() {
  const dispatch = useDispatch();
  const { currentEvent, eventCitiesList } = useSelector(
    (state) => state.events,
  );

  useEffect(() => {
    axios
      .get(`${CONST.API}/coda/tour-dates`, {
        params: {
          event_id: currentEvent.id,
          season_id: currentEvent.seasonId,
        },
      })
      .then((response) => {
        dispatch(createEventCitiesList(response.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
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
            variable="tourDateId"
          />
        </div>

        <NavButtonsComponent
          button1="BACK"
          button2="NEXT"
          location="tourDates"
          disabled="notDisabled"
        />
      </div>
    </div>
  );
}

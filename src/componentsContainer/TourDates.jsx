import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import axios from 'axios';

import Navbar from '../componentsReusable/Navbar';
import SelectDate from '../componentsReusable/SelectDate';
import NavButtons from '../componentsReusable/buttons/NavButtons';
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
        console.error(error);
      });
  }, [currentEvent.id, currentEvent.seasonId, dispatch]);

  return (
    <div>
      <Navbar text="choose your city" />

      <div className="main-container">
        <Image
          className="img-event--big"
          src={`${CONST.ASSETS_URL}/coda/${currentEvent.id}.svg`}
          alt={`${currentEvent.name} logo`}
        />

        <div className="main-container__middle-container">
          <SelectDate
            inputs={eventCitiesList}
            name="CHOOSE YOUR CITY"
            variable="tourDateId"
          />
        </div>

        <NavButtons
          button1="BACK"
          button2="NEXT"
          location="tourDates"
          disabled="notDisabled"
        />
      </div>
    </div>
  );
}

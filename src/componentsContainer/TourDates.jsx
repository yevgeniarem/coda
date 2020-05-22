import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';

import Navbar from '../componentsReusable/Navbar';
import SelectDate from '../componentsReusable/SelectDate';
import NavButtons from '../componentsReusable/buttons/NavButtons';
import { getTourDates } from '../redux/actions/appActions';
import CONST from '../utils/constants';

export default function TourDates() {
  const dispatch = useDispatch();
  const { currentEvent, tourDates } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getTourDates(currentEvent));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar text="choose your city" />

      <div className="main-container">
        <Image
          className="img-event--big"
          src={`${CONST.ASSETS_URL}/coda/${currentEvent.id}.svg`}
          alt={`${currentEvent.name} logo`}
        />

        <div className="main-container__middle-container">
          <SelectDate
            inputs={tourDates}
            name="CHOOSE YOUR CITY"
            variable="tourDateId"
          />
        </div>

        <NavButtons
          leftButtonText="BACK"
          rightButtonText="NEXT"
          location="tourDates"
        />
      </div>
    </>
  );
}

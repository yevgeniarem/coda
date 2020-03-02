import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import SelectInputComponent from './SelectInputComponent';
import NavButtonsComponent from './NavButtonsComponent';
import axios from 'axios';

const Judge3 = () => {
  const { eventID, seasonID } = useSelector(state => state.events);

  useEffect(() => {
    axios
      .get(`https://api.d360test.com/api/coda/tour-dates`, {
        params: {
          event_id: 'INT',
          season_id: 'INT'
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const tourDates = [
    {
      id: 1,
      event: 'jump',
      city: 'St. Louis',
      date: 'December 7-9, 2019'
    },
    {
      id: 2,
      event: 'jump',
      city: 'Detroit',
      date: 'January 1-5, 2020'
    },
    {
      id: 3,
      event: 'jump',
      city: 'Chicago',
      date: 'January 12-14, 2020'
    },
    {
      id: 4,
      event: 'jump',
      city: 'Los Angeles',
      date: 'February 9-13, 2020'
    },
    {
      id: 5,
      event: 'jump',
      city: 'San Francisco',
      date: 'February 20-24, 2020'
    }
  ];

  return (
    <div>
      <NavbarComponent type="chooseYourCity" text="CHOOSE YOUR CITY" />

      <div className="main-container">
        <Image
          className="img-event--big"
          src="https://assets.dance360.com/coda/7.svg"
          alt="jump logo"
        />

        <div className="main-container__middle-container">
          <SelectInputComponent
            options={tourDates}
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

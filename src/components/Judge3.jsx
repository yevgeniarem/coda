import React from 'react';
import { Image, Dropdown } from 'react-bootstrap';
import NavbarComponent from './NavbarComponent';
import EventLogoComponent from './EventLogoComponent';

const Judge3 = () => {
  return (
    <div>
      <NavbarComponent type="chooseYourCity" text="CHOOSE YOUR CITY:" />

      <div className="selector-container">
        <EventLogoComponent className="img-event" />
        <Image
          className="img-event__img--big"
          src="https://assets.dance360.com/coda/7.svg"
          alt="judge logo"
        />

        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">{}</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Judge3;

import React from 'react';
import classNames from 'classnames';
import { Navbar } from 'react-bootstrap';

const NavbarComponent = ({ type, text, subtext }) => {
  const navClassNames = {
    chooseYourEvent: 'navbar--choose-your-event',
    chooseYourCity: 'navbar--choose-your-city'
  };

  return (
    <Navbar className={classNames('navbar', navClassNames[type])}>
      <div className="navbar__main-header">
        <h1 className="navbar__text">{text}</h1>
        <h2 className="navbar__subtext">{subtext}</h2>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;

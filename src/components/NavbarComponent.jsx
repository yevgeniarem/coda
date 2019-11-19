import React from "react";
import classNames from 'classnames';
import { Navbar } from "react-bootstrap";

const NavbarComponent = ({ type, text }) => {
    const navClassNames = {
        chooseYourEvent: 'navbar--choose-your-event',
        chooseYourCity: 'navbar--choose-your-city',
    };

    return (
        <Navbar className={classNames('navbar', navClassNames[type])}>
            <h1 className='navbar__text'>{text}</h1>
        </Navbar>
    );
};

export default NavbarComponent;

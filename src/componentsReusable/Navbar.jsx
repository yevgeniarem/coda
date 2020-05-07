import React from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Navbar({ text }) {
  return (
    <BootstrapNavbar className="navbar">
      <div className="navbar__main-header">
        <h1 className="navbar__text">{text.toUpperCase()}</h1>
      </div>
    </BootstrapNavbar>
  );
}

Navbar.propTypes = {
  text: PropTypes.string.isRequired,
};

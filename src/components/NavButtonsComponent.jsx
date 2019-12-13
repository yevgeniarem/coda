import React from 'react';
import { Button } from 'react-bootstrap';

const NavButtonsComponent = ({ button1, button2 }) => {
  return (
    <div className="button-wrapper">
      <Button className="button action-button--navigation action-button--grey">
        {button1}
      </Button>
      <Button className="button action-button--navigation action-button--blue">
        {button2}
      </Button>
    </div>
  );
};

export default NavButtonsComponent;

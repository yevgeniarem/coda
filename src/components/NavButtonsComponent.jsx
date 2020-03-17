import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NavButtonsComponent = ({ button1, button2 }) => {
  const history = useHistory();
  const handleClick = e => {
    if (e.target.value === 'BACK') history.push('/Judge2');
    if (e.target.value === 'NEXT') history.push('/Judge4');
  };

  return (
    <div className="button-wrapper">
      <Button
        onClick={handleClick}
        className="button action-button--navigation action-button--grey"
        value={button1}
      >
        {button1}
      </Button>
      <Button
        onClick={handleClick}
        className="button action-button--navigation action-button--blue"
        value={button2}
      >
        {button2}
      </Button>
    </div>
  );
};

export default NavButtonsComponent;

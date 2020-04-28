import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const DropdownComponent = () => {
  const history = useHistory();

  const handleClick = (action) => {
    if (action === 'change-judge') history.push('/Judge4');
    if (action === 'sign-out') history.push('/Judge1');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="profile-dropdown" />

      <Dropdown.Menu alignRight className="profile-dropdown__list">
        <Dropdown.Item
          className="profile-dropdown__item"
          href="#/change-judge-info"
          onClick={() => handleClick('change-judge')}
        >
          CHANGE JUDGE INFO
        </Dropdown.Item>
        <Dropdown.Item
          className="profile-dropdown__item"
          href="#/sign-out"
          onClick={() => handleClick('sign-out')}
        >
          SIGN OUT
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComponent;

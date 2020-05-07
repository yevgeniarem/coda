import React from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Dropdown() {
  const history = useHistory();

  const handleClick = (action) => {
    if (action === 'change-judge') history.push('/Judges');
    if (action === 'sign-out') history.push('/Login');
  };

  return (
    <BootstrapDropdown>
      <BootstrapDropdown.Toggle className="profile-dropdown" />

      <BootstrapDropdown.Menu alignRight className="profile-dropdown__list">
        <BootstrapDropdown.Item
          className="profile-dropdown__item"
          href="#/change-judge-info"
          onClick={() => handleClick('change-judge')}
        >
          CHANGE JUDGE INFO
        </BootstrapDropdown.Item>
        <BootstrapDropdown.Item
          className="profile-dropdown__item"
          href="#/sign-out"
          onClick={() => handleClick('sign-out')}
        >
          SIGN OUT
        </BootstrapDropdown.Item>
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
}

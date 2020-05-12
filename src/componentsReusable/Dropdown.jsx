import React from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Dropdown() {
  const history = useHistory();

  const handleClick = (action) => {
    if (action === 'change-judge') history.push('/Judges');
    if (action === 'sign-out') history.push('/Login');
  };

  const dropdownItems = [
    { name: 'CHANGE JUDGE INFO', info: 'change-judge' },
    { name: 'SIGN OUT', info: 'sign-out' },
  ];

  return (
    <BootstrapDropdown>
      <BootstrapDropdown.Toggle className="profile-dropdown" />
      <BootstrapDropdown.Menu alignRight className="profile-dropdown__list">
        {dropdownItems.map((i) => (
          <BootstrapDropdown.Item
            className="profile-dropdown__item"
            href={`#/${i.info}`}
            onClick={() => handleClick(i.info)}
            key={i.info}
          >
            {i.name}
          </BootstrapDropdown.Item>
        ))}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
}

import React from 'react';
import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { dropdownItems } from '../utils/constants';

export default function Dropdown() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <BootstrapDropdown>
      <BootstrapDropdown.Toggle className="profile-dropdown" />
      <BootstrapDropdown.Menu alignRight className="profile-dropdown__list">
        {dropdownItems.map((i) => (
          <BootstrapDropdown.Item
            className="profile-dropdown__item"
            href={`#/${i.info}`}
            onClick={() => handleClick(i.path)}
            key={i.info}
          >
            {i.name}
          </BootstrapDropdown.Item>
        ))}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
}

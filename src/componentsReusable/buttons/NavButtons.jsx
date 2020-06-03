import React from 'react';
import PropTypes from 'prop-types';

import LeftNavButton from './LeftNavButton';
import RightNavButton from './RightNavButton';

export default function NavButtons({
  leftButtonText,
  rightButtonText,
  location,
  handleClick,
}) {
  return (
    <div className="button-wrapper">
      <LeftNavButton text={leftButtonText} />

      <RightNavButton
        text={rightButtonText}
        location={location}
        handleClick={handleClick}
      />
    </div>
  );
}

NavButtons.propTypes = {
  leftButtonText: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import LeftNavButton from './LeftNavButton';
import RightNavButton from './RightNavButton';

export default function NavButtons({
  leftButtonText,
  rightButtonText,
  leftInitiallyDisabled,
  rightInitiallyDisabled,
  location,
}) {
  return (
    <div className="button-wrapper">
      <LeftNavButton
        text={leftButtonText}
        initiallyDisabled={leftInitiallyDisabled}
        location={location}
      />
      <RightNavButton
        text={rightButtonText}
        initiallyDisabled={rightInitiallyDisabled}
        location={location}
      />
    </div>
  );
}

NavButtons.propTypes = {
  leftButtonText: PropTypes.string.isRequired,
  rightButtonText: PropTypes.string.isRequired,
  leftInitiallyDisabled: PropTypes.bool,
  rightInitiallyDisabled: PropTypes.bool,
  location: PropTypes.string.isRequired,
};

NavButtons.defaultProps = {
  leftInitiallyDisabled: false,
  rightInitiallyDisabled: false,
};

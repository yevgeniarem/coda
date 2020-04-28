import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCurrentEvent } from '../redux/actions/appActions';

const EventLogoComponent = ({ id, imgSrc, imgAlt, index }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = () => {
    history.push('/Judge3');
    dispatch(updateCurrentEvent(id));
  };

  return (
    <div
      className={`img-event__container ${
        index % 2 === 0 ? 'img-event__container--isLeft' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <Image src={imgSrc} alt={imgAlt} />
    </div>
  );
};

EventLogoComponent.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default EventLogoComponent;

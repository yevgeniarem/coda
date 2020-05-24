import React from 'react';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { updateCurrentEvent } from '../redux/actions/appActions';
import { isEven } from '../utils/helpers';

export default function EventLogo({ id, imgSrc, imgAlt, index }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(updateCurrentEvent(id));
    history.push('/TourDates');
  };

  return (
    <div
      className={classNames(
        'img-event__container',
        isEven(index) ? 'img-event__container--isLeft' : '',
      )}
      onClick={handleClick}
      role="button"
      tabIndex="0"
    >
      <Image src={imgSrc} alt={imgAlt} />
    </div>
  );
}

EventLogo.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

import React from 'react';
import { Image } from 'react-bootstrap';
import { Redirect } from 'react-router';

const EventLogoComponent = ({ imgSrc, imgAlt, index }) => {
  const handleClick = () => {
    return <Redirect to="/Judge3" />;
  };

  return (
    <div
      className={`img-event__container ${
        index % 2 === 0 ? 'img-event__container--isLeft' : ''
      }`}
      onClick={handleClick}
    >
      <Image src={imgSrc} alt={imgAlt} />
    </div>
  );
};

export default EventLogoComponent;

import React from "react";
import { Image } from "react-bootstrap";

const EventLogoComponent = ({ className, imgSrc, imgAlt }) => {
  return (
    <div className='img-event__container'>
      <Image className={className} src={imgSrc} alt={imgAlt} />
    </div>
  );
};

export default EventLogoComponent;

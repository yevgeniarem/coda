import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventLogoComponent from './EventLogoComponent';
import NavbarComponent from './NavbarComponent';

const Judge2 = () => {
  const events = [
    {
      id: 7,
      name: 'jump',
      row: 1,
      position: 'left'
    },
    {
      id: 8,
      name: 'nuvo',
      row: 1,
      position: 'right'
    },
    {
      id: 18,
      name: '24seven',
      row: 2,
      position: 'left'
    },
    {
      id: 14,
      name: 'tda',
      row: 2,
      position: 'right'
    }
  ];

  const generateLogosByRowNum = rowNum =>
    events
      .filter(e => e.row === rowNum)
      .map(e => (
        <Col className={`img-event__col-${e.position}`} key={e.id}>
          <EventLogoComponent
            className={`img-event--${e.name}`}
            imgSrc={`https://assets.dance360.com/coda/${e.id}.svg`}
            imgAlt={`clickable ${e.name} logo`}
          />
        </Col>
      ));

  return (
    <div>
      <NavbarComponent type="chooseYourEvent" text="CHOOSE YOUR EVENT" />

      <Container className="img-event">
        <Row className="img-event__row">{generateLogosByRowNum(1)}</Row>
        <Row className="img-event__row">{generateLogosByRowNum(2)}</Row>
      </Container>
    </div>
  );
};

export default Judge2;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { createEvents } from '../redux/actions/appActions';
import EventLogoComponent from './EventLogoComponent';
import NavbarComponent from './NavbarComponent';

const Judge2 = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    axios
      .get('https://api.d360test.com/api/coda/events')
      .then((response) => {
        dispatch(createEvents(response.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, []);

  const generateEventLogos = () => {
    if (events) {
      return events.map((e, i) => (
        <Col xs={6} key={e.id} className="img-event__col">
          <EventLogoComponent
            id={e.id}
            imgSrc={`https://assets.dance360.com/coda/${e.id}.svg`}
            imgAlt={`clickable ${e.name} logo`}
            index={i}
          />
        </Col>
      ));
    }
    return null;
  };

  return (
    <div>
      <NavbarComponent type="chooseYourEvent" text="CHOOSE YOUR EVENT" />

      <Container className="img-event">
        <Row>{generateEventLogos()}</Row>
      </Container>
    </div>
  );
};

export default Judge2;

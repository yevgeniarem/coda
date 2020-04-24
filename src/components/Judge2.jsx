import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvents } from '../redux/actions/appActions';
import { Container, Row, Col } from 'react-bootstrap';
import EventLogoComponent from './EventLogoComponent';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';

const Judge2 = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    axios
      .get(`https://api.d360test.com/api/coda/events`)
      .then(function (response) {
        dispatch(createEvents(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dispatch]);

  const generateEventLogos = () =>
    events.map((e, i) => (
      <Col xs={6} key={e.id} className="img-event__col">
        <EventLogoComponent
          id={e.id}
          imgSrc={`https://assets.dance360.com/coda/${e.id}.svg`}
          imgAlt={`clickable ${e.name} logo`}
          index={i}
        />
      </Col>
    ));

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

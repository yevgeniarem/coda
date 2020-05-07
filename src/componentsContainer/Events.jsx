import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { createEvents } from '../redux/actions/appActions';
import EventLogo from '../componentsReusable/EventLogo';
import Navbar from '../componentsReusable/Navbar';
import CONST from '../utils/constants';

export default function Events() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    axios
      .get(`${CONST.API}/coda/events`)
      .then((response) => {
        dispatch(createEvents(response.data));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [dispatch]);

  return (
    <div>
      <Navbar text="choose your event" />

      <Container className="img-event">
        <Row>
          {events &&
            events
              .map((e, i) => (
                <Col xs={6} key={e.id} className="img-event__col">
                  <EventLogo
                    id={e.id}
                    imgSrc={`${CONST.ASSETS_URL}/coda/${e.id}.svg`}
                    imgAlt={`clickable ${e.name} logo`}
                    index={i}
                  />
                </Col>
              ))
              .slice(0, 4)}
        </Row>
      </Container>
    </div>
  );
}

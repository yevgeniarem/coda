import React from 'react';
import { Image, Form, Button } from 'react-bootstrap';
import InputGroupComponent from './InputGroupComponent';

const Judge1 = () => {
  const login = [
    { username: 'jane', password: 'testtest' },
    { username: 'jason', password: 'testtest' }
  ];

  return (
    <div>
      <Image
        className="img-logo img-logo--home"
        src="./images/coda.svg"
        alt="CODA logo"
      />

      <Form className="form form--login">
        <Form.Group controlId="formBasicEmail">
          <InputGroupComponent type="email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <InputGroupComponent type="password" />
        </Form.Group>

        <Button className="button action-button--submit">LOGIN</Button>
      </Form>
    </div>
  );
};

export default Judge1;

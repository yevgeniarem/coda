import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Image, Form, Button } from 'react-bootstrap';
import InputGroupComponent from './InputGroupComponent';

const Judge1 = () => {
  const name = useSelector(state => state.login.name);
  const password = useSelector(state => state.login.password);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`https://api.d360test.com/api/auth/signin`, {
        body: {
          name: { name },
          password: { password }
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error => {
        console.log('There is no user with the given username and password');
      });
  };

  return (
    <div>
      <Image
        className="img-logo img-logo--home"
        src="./images/coda.svg"
        alt="CODA logo"
      />

      <Form onSubmit={handleSubmit} className="form form--login">
        <Form.Group controlId="formBasicEmail">
          <InputGroupComponent type="name" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <InputGroupComponent type="password" />
        </Form.Group>

        <Button type="submit" className="button action-button--submit">
          LOGIN
        </Button>
      </Form>
    </div>
  );
};

export default Judge1;

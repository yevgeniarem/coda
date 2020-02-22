import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Form, Button } from 'react-bootstrap';
import InputGroupComponent from './InputGroupComponent';
import {
  authLogin,
  invalidLogin,
  handleModalClose
} from '../redux/actions/appActions';
import { Redirect } from 'react-router';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';

const Judge1 = () => {
  const name = useSelector(state => state.login.name);
  const password = useSelector(state => state.login.password);
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const isInvalid = useSelector(state => state.login.isInvalid);
  const dispatch = useDispatch();

  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all'
  });

  const onSubmit = data => {
    axios
      .post(`https://api.d360test.com/api/auth/signin`, {
        name: name,
        password: password
      })
      .then(res => {
        dispatch(authLogin());
      })
      .catch(error => {
        dispatch(invalidLogin());
      });
  };

  if (isLoggedIn === true) {
    return <Redirect to="/Judge2" />;
  }

  return (
    <>
      <Modal
        className="modal"
        show={isInvalid}
        onHide={() => dispatch(handleModalClose())}
        centered
      >
        <Modal.Header className="modal__header">
          <Modal.Title className="modal__title">Sorry</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          You have entered an invalid username or password.
        </Modal.Body>
        <Modal.Footer className="modal__footer">
          <Button
            variant="secondary"
            onClick={() => dispatch(handleModalClose())}
            className="button action-button--navigation action-button--blue"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Image
        className="img-logo img-logo--home"
        src="./images/coda.svg"
        alt="CODA logo"
      />

      <Form onSubmit={handleSubmit(onSubmit)} className="form form--login">
        <Form.Group controlId="formBasicEmail">
          <InputGroupComponent
            type="name"
            register={register({ required: 'Username is required' })}
            errors={errors}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <InputGroupComponent
            type="password"
            register={register({ required: 'Password is required' })}
            errors={errors}
          />
        </Form.Group>

        <Button type="submit" className="button action-button--submit">
          LOGIN
        </Button>
      </Form>
    </>
  );
};

export default Judge1;

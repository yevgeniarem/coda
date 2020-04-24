import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Form, Button } from 'react-bootstrap';
import InputGroupComponent from './InputGroupComponent';
import ModalComponent from './ModalComponent';
import { authLogin, invalidLogin } from '../redux/actions/appActions';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Judge1 = () => {
  const { name, password, isInvalid } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all',
  });

  const onSubmit = (data) => {
    axios
      .post(`https://api.d360test.com/api/auth/signin`, {
        name: name,
        password: password,
      })
      .then((res) => {
        dispatch(authLogin());
        history.push('/Judge2');
      })
      .catch((error) => {
        dispatch(invalidLogin(true));
      });
  };

  return (
    <>
      <ModalComponent
        isShown={isInvalid}
        title="Sorry"
        body="You have entered an invalid username or password."
        numButtons="1"
        button1="OK"
        location="judge1"
      />

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

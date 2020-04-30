import React from 'react';
import { useSelector } from 'react-redux';
import { Image, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputGroupComponent from './InputGroupComponent';
import ModalComponent from './ModalComponent';
import { tryLogin } from '../redux/actions/appActions';
import SubmitButton from '../componentsReusable/buttons/Submit';

export default function Judge1() {
  const { name, password, isInvalid } = useSelector((state) => state.login);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all',
  });

  const onSubmit = async () => {
    try {
      await tryLogin({ name, password });
      history.push('/Judge2');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const formInputs = [
    {
      name: 'name',
      registerOptions: { required: 'Username is required' },
      controlId: 'formBasicEmail',
    },
    {
      name: 'password',
      registerOptions: { required: 'Password is required' },
      controlId: 'formBasicPassword',
    },
  ];

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
        {formInputs.map((i) => (
          <Form.Group controlId={i.controlId} key={i.name}>
            <InputGroupComponent
              type={i.name}
              register={register(i.registerOptions)}
              errors={errors}
            />
          </Form.Group>
        ))}

        <SubmitButton text="LOGIN" />
      </Form>
    </>
  );
}

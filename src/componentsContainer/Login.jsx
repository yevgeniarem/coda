import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputGroupComponent from '../components/InputGroupComponent';
import ModalComponent from '../components/ModalComponent';
import SubmitButton from '../componentsReusable/buttons/Submit';
import { tryLogin } from '../redux/actions/appActions';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name, password, isInvalid } = useSelector((state) => state.login);
  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all',
  });

  const onSubmit = async () => {
    try {
      await dispatch(tryLogin({ name, password }));
      history.push('/Events');
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
        location="login"
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

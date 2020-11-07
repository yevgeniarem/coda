import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputGroup from '../componentsReusable/InputGroup';
import SubmitButton from '../componentsReusable/buttons/SubmitButton';
import { tryLogin, runModal } from '../redux/actions/appActions';
import { formInputs } from '../utils/constants';
import { Modal } from '../utils/models';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all',
  });
  const { name, password } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(
      runModal(
        new Modal({
          isModalShown: true,
          modalInfo: {
            title: 'Welcome to my CODA app!',
            body:
              'Use "jane" and "testtest" to log in. Due to COVID, live events have been postponed, and data may be incomplete as adjustments are being made. Regardless, feel free to look around, and thanks for stopping by!',
            confirm: {
              text: 'Ok!',
            },
          },
        }),
      ),
    );
    // eslint-disable-next-line
  }, []);

  const onSubmit = async () => {
    await dispatch(tryLogin({ name, password }));
    history.push('/Events');
  };

  return (
    <>
      <Image
        className="img-logo img-logo--home"
        src="./images/coda.svg"
        alt="CODA logo"
      />

      <Form onSubmit={handleSubmit(onSubmit)} className="form form--login">
        {formInputs.map((i) => (
          <Form.Group controlId={i.controlId} key={i.name}>
            <InputGroup
              type={i.name}
              register={register(i.registerOptions)}
              errors={errors}
            />
          </Form.Group>
        ))}

        <SubmitButton text="LOGIN" classes={['action-button--submit']} />
      </Form>
    </>
  );
}

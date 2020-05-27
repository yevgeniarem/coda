import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import InputGroup from '../componentsReusable/InputGroup';
import LoginModal from '../componentsReusable/modals/LoginModal';
import SubmitButton from '../componentsReusable/buttons/SubmitButton';
import { tryLogin } from '../redux/actions/appActions';
import { formInputs } from '../utils/constants';

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm({
    validateCriteriaMode: 'all',
  });
  const [{ name, password }, { isLoginModalShown }] = useSelector((state) => [
    state.login,
    state.modals,
  ]);

  const onSubmit = async () => {
    try {
      await dispatch(tryLogin({ name, password }));
      history.push('/Events');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <>
      <LoginModal
        isShown={isLoginModalShown}
        title="Sorry"
        body="You have entered an invalid username or password."
        button1="OK"
      />

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

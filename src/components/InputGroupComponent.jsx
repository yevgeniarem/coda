import React from 'react';
import classNames from 'classnames';
import { InputGroup, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateLogin } from '../redux/actions/appActions';
import { ErrorMessage } from 'react-hook-form';

const InputGroupComponent = ({ type, register, errors }) => {
  const dispatch = useDispatch();

  const iconClasses = {
    name: 'far fa-envelope',
    password: 'fas fa-lock'
  };

  const handleChange = e =>
    dispatch(updateLogin({ value: e.target.value, type }));
  return (
    <>
      <InputGroup className="text-input text-input--icon-left mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className="text-input--icon-left__icon">
            <i className={classNames('icon', 'fa-lg', iconClasses[type])}></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          className="text-input"
          name={type}
          type={type}
          onChange={handleChange}
          ref={register}
        />
      </InputGroup>
      <ErrorMessage errors={errors} name={type}>
        {({ message }) => <p className="form form__error-message">{message}</p>}
      </ErrorMessage>
    </>
  );
};

export default InputGroupComponent;

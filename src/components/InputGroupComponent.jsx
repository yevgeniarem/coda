import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { updateLogin } from '../redux/actions/appActions';

const InputGroupComponent = ({ type, register, errors }) => {
  const dispatch = useDispatch();

  const iconClasses = {
    name: ['far', 'envelope'],
    password: ['fas', 'lock'],
  };

  const handleChange = (e) => {
    dispatch(updateLogin({ value: e.target.value, type }));
  };
  return (
    <>
      <InputGroup className="text-input text-input--icon-left mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className="text-input--icon-left__icon">
            <FontAwesomeIcon icon={iconClasses[type]} className="icon fa-lg" />
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

InputGroupComponent.propTypes = {
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

InputGroupComponent.defaultProps = {
  errors: {},
};

export default InputGroupComponent;

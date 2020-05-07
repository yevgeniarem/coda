import React from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from 'react-hook-form';
import { InputGroup as BootstrapInputGroup, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import { updateLogin } from '../redux/actions/appActions';

export default function InputGroup({ type, register, errors }) {
  const dispatch = useDispatch();

  const iconClasses = {
    name: ['far', 'envelope'],
    password: ['fas', 'lock'],
  };

  const handleChange = (e) =>
    dispatch(updateLogin({ value: e.target.value, type }));

  return (
    <>
      <BootstrapInputGroup className="text-input text-input--icon-left mb-3">
        <BootstrapInputGroup.Prepend>
          <BootstrapInputGroup.Text className="text-input--icon-left__icon">
            <FontAwesomeIcon icon={iconClasses[type]} className="icon fa-lg" />
          </BootstrapInputGroup.Text>
        </BootstrapInputGroup.Prepend>
        <Form.Control
          className="text-input"
          name={type}
          type={type}
          onChange={handleChange}
          ref={register}
        />
      </BootstrapInputGroup>
      <ErrorMessage errors={errors} name={type}>
        {({ message }) => <p className="form form__error-message">{message}</p>}
      </ErrorMessage>
    </>
  );
}

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

InputGroup.defaultProps = {
  errors: {},
};

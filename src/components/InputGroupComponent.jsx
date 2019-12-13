import React from 'react';
import classNames from 'classnames';
import { InputGroup, Form } from 'react-bootstrap';

const InputGroupComponent = ({ type }) => {
  const iconClasses = {
    email: 'far fa-envelope',
    password: 'fas fa-lock'
  };

  return (
    <InputGroup className="text-input text-input--icon-left mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text className="text-input--icon-left__icon">
          <i class={classNames('icon', 'fa-lg', iconClasses[type])}></i>
        </InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control className="text-input" type={type} />
    </InputGroup>
  );
};

export default InputGroupComponent;

import React from 'react';
import { Form } from 'react-bootstrap';

const SelectInputComponent = ({ options, var1, var2 }) => {
  return (
    <Form>
      <div className="form__select-wrapper">
        <Form.Control
          as="select"
          className="form__select-input form__first-input"
        >
          {options.map(e => (
            <option>
              {e.city} - {e.date}
            </option>
          ))}
        </Form.Control>
      </div>
    </Form>
  );
};

export default SelectInputComponent;

import React from 'react';
import { Form } from 'react-bootstrap';

const SelectInputComponent = ({ options, formatType, variable, name }) => {
  let format;
  if (formatType === 'twoVar') {
    format = e => e.city + ' - ' + e.date;
  }
  if (formatType === 'oneVar') {
    format = e => e[variable];
  }
  return (
    <Form className="form--main-container">
      <div className="form__select-wrapper">
        <Form.Control
          as="select"
          className="form__select-input form__first-input"
        >
          <option value="" disabled defaultValue>
            {name}
          </option>
          {options.map(e => (
            <option key={e.id}>{format(e)}</option>
          ))}
        </Form.Control>
      </div>
    </Form>
  );
};

export default SelectInputComponent;

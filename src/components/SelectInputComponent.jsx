import React from 'react';
import { Form } from 'react-bootstrap';

const SelectInputComponent = ({ options, formatType, variable, name }) => {
  let format, dates;
  var moment = require('moment');
  if (formatType === 'twoVar') {
    format = e => {
      if (
        moment.utc(e.startDate).format('MMM') ===
        moment.utc(e.endDate).format('MMM')
      ) {
        dates = `${moment.utc(e.startDate).format('MMM D')}-${moment
          .utc(e.endDate)
          .format('D, YYYY')}`;
      } else {
        dates = `${moment.utc(e.startDate).format('MMM D')}-${moment
          .utc(e.endDate)
          .format('MMM D, YYYY')}`;
      }
      return e.eventCity + ' - ' + dates;
    };
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

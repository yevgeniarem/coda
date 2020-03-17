import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const SelectInputComponent = ({ inputs, formatType, variable, name }) => {
  let format, mappedInputs;
  const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    if (formatType === 'twoVar') {
      const { id } =
        inputs.find(e => moment.utc(e.startDate).isSameOrAfter(moment.utc())) ||
        {};
      setSelectedCity(id);
    }
  }, [inputs, formatType]);

  if (formatType === 'twoVar') {
    let dates;
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

  const handleChange = e => {
    setSelectedCity(Number(e.target.value));
  };

  mappedInputs = inputs.map(e => {
    return (
      <option key={e.id} value={e.id}>
        {format(e)}
      </option>
    );
  });

  return (
    <Form className="form--main-container">
      <div className="form__select-wrapper">
        <Form.Control
          as="select"
          className="form__select-input form__first-input"
          value={selectedCity}
          onChange={handleChange}
        >
          <option disabled>{name}</option>
          {mappedInputs}
        </Form.Control>
      </div>
    </Form>
  );
};

export default SelectInputComponent;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { updateInput } from '../redux/actions/appActions';

export default function SelectInput({ inputs, variable, name }) {
  const dispatch = useDispatch();
  const selectInputs = useSelector((state) => state.inputs);

  const handleChange = (e) => {
    dispatch(
      updateInput({
        variable,
        id: Number(e.target.value),
      }),
    );
  };

  return (
    <Form className="form--main-container">
      <div className="form__select-wrapper">
        <Form.Control
          as="select"
          className="form__select-input form__first-input"
          value={`${selectInputs[variable] || 'default'}`}
          onChange={handleChange}
        >
          <option key="default" value="default" disabled>
            {name}
          </option>
          {inputs &&
            inputs.map((i) => (
              <option key={i.id} value={i.id} name={i[variable]}>
                {i[variable]}
              </option>
            ))}
        </Form.Control>
      </div>
    </Form>
  );
}

SelectInput.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object),
  variable: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

SelectInput.defaultProps = {
  inputs: null,
};

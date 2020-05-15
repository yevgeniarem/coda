import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { updateInput } from '../redux/actions/appActions';

export default function SelectInput({ inputs, variable, name }) {
  const dispatch = useDispatch();
  const selectInputs = useSelector((state) => state.inputs);

  const handleChange = (e) => {
    if (variable === 'teacherJudge') {
      if (e.target.value === 'true') {
        dispatch(updateInput({ variable, id: true }));
      } else {
        dispatch(updateInput({ variable, id: false }));
      }
    } else {
      dispatch(updateInput({ variable, id: Number(e.target.value) }));
    }
  };

  return (
    <Form className="form--main-container">
      <div className="form__select-wrapper">
        <Form.Control
          as="select"
          className="form__select-input form__first-input"
          value={selectInputs[variable]}
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
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  variable: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

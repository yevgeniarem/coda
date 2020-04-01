import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInput } from '../redux/actions/appActions';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const SelectInputComponent = ({ inputs = [], formatType, variable, name }) => {
  let format, mappedInputs;
  const dispatch = useDispatch();
  const selectInputs = useSelector(state => state.inputs);

  useEffect(() => {
    if (formatType === 'twoVar') {
      const { id } =
        inputs.find(e => moment.utc(e.startDate).isSameOrAfter(moment.utc())) ||
        {};
      dispatch(updateInput(variable, id));
    }
  }, [inputs, formatType, dispatch, variable]);

  if (formatType === 'oneVar') {
    format = input => input[variable];
  }

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

  const handleChange = e => {
    dispatch(updateInput(variable, Number(e.target.value)));
    if (formatType === 'oneVar')
      dispatch(updateInput(variable, Number(e.target.value)));
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
          value={selectInputs[variable]}
          onChange={handleChange}
        >
          <option key="default" value="default" disabled>
            {name}
          </option>
          {mappedInputs}
        </Form.Control>
      </div>
    </Form>
  );
};

export default SelectInputComponent;

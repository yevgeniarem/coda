import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import SelectInput from './SelectInput';
import { updateInput } from '../redux/actions/appActions';

export default function SelectDate({ inputs, variable, name }) {
  let date;
  const dispatch = useDispatch();
  const { id } =
    inputs.find((input) =>
      moment.utc(input.endDate).isSameOrAfter(moment.utc()),
    ) || {};

  useEffect(() => {
    dispatch(updateInput(variable, id));
  }, [dispatch, id, variable]);

  const format = (e) => {
    if (
      moment.utc(e.startDate).format('MMM') ===
      moment.utc(e.endDate).format('MMM')
    ) {
      date = `${moment.utc(e.startDate).format('MMM D')}-${moment
        .utc(e.endDate)
        .format('D, YYYY')}`;
    } else {
      date = `${moment.utc(e.startDate).format('MMM D')}-${moment
        .utc(e.endDate)
        .format('MMM D, YYYY')}`;
    }
    return `${e.eventCity} - ${date}`;
  };

  return (
    <SelectInput
      inputs={inputs.map((i) => ({
        id: i.id,
        tourDateId: format(i),
      }))}
      variable={variable}
      name={name}
    />
  );
}

SelectDate.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  variable: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import SelectInput from './SelectInput';
import { updateInput } from '../redux/actions/appActions';
import { formatTourDate } from '../utils/helpers';

export default function SelectDate({ inputs, variable, name }) {
  const dispatch = useDispatch();
  const { id } =
    (inputs &&
      inputs.find((input) =>
        moment.utc(input.endDate).isSameOrAfter(moment.utc()),
      )) ||
    {};

  useEffect(() => {
    dispatch(updateInput({ variable, id }));
  }, [dispatch, id, variable]);

  return (
    <SelectInput
      inputs={
        inputs &&
        inputs.map((i) => ({
          id: i.id,
          tourDateId: formatTourDate(i),
        }))
      }
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

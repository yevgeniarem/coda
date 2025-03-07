import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import SelectInput from './SelectInput';
import { updateInput } from '../redux/actions/appActions';
import { findNextAvailableDate } from '../utils/helpers';
import { Input } from '../utils/models';

export default function SelectDate({ inputs, variable, name }) {
  const dispatch = useDispatch();
  const { id } = findNextAvailableDate(inputs) || {};

  useEffect(() => {
    dispatch(updateInput({ variable, id }));
    // eslint-disable-next-line
  }, [id]);

  return (
    <SelectInput
      inputs={inputs && inputs.map((i) => new Input(i))}
      variable={variable}
      name={name}
    />
  );
}

SelectDate.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object),
  variable: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

SelectDate.defaultProps = {
  inputs: null,
};

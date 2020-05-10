import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getRoutineList } from '../../redux/actions/appActions';

export default function RefreshButton() {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const [isFetching, setIsFetching] = useState(false);

  const handleRefresh = () => {
    setIsFetching(true);
    dispatch(getRoutineList(inputs));
    window.setTimeout(() => setIsFetching(false), 1000);
  };

  return (
    <Button
      type="button"
      className={`button action-button--submit action-button--green ${
        isFetching ? 'action-button--refreshing' : ''
      }`}
      onClick={handleRefresh}
    >
      <FontAwesomeIcon icon={['fas', 'redo']} className="icon--refresh" />{' '}
      REFRESH LIST
    </Button>
  );
}

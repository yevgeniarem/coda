import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import ReactSidebar from 'react-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';

import {
  updateRoutineList,
  toggleSidebar,
  runRoutineModal,
} from '../redux/actions/appActions';
import Modal from './Modal';
import CONST from '../utils/constants';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { routineList, currentRoutine } = useSelector(
    (state) => state.routines,
  );
  const { currentEvent, eventCitiesList } = useSelector(
    (state) => state.events,
  );
  const { position, tourDateId, competitionGroup } = useSelector(
    (state) => state.inputs,
  );
  const { isRoutineModalShown } = useSelector((state) => state.modals);
  const isSidebarOpen = useSelector((state) => state.sidebar);
  const [isFetching, setIsFetching] = useState(false);
  const [clickedRoutine, setClickedRoutine] = useState({});

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  const formatDate = (tourDate) => {
    let dates;
    if (
      moment.utc(tourDate.startDate).format('MMM') ===
      moment.utc(tourDate.endDate).format('MMM')
    ) {
      dates = `${moment.utc(tourDate.startDate).format('MMM D')}-${moment
        .utc(tourDate.endDate)
        .format('D, YYYY')}`;
    } else {
      dates = `${moment.utc(tourDate.startDate).format('MMM D')}-${moment
        .utc(tourDate.endDate)
        .format('MMM D, YYYY')}`;
    }
    return `${tourDate.eventCity} - ${dates}`;
  };

  const currentTourDate = formatDate(
    eventCitiesList.find((city) => city.id === tourDateId),
  );

  const handleRefresh = () => {
    setIsFetching(true);
    axios
      .get(`${CONST.API}/coda/routines`, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: competitionGroup,
          position,
        },
      })
      .then((response) => {
        dispatch(updateRoutineList(response.data));
        window.setTimeout(() => setIsFetching(false), 1000);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const refreshButton = (
    <button
      type="button"
      className={`button action-button--submit action-button--green ${
        isFetching ? 'action-button--refreshing' : ''
      }`}
      onClick={handleRefresh}
    >
      <FontAwesomeIcon icon={['fas', 'redo']} className="icon--refresh" />{' '}
      REFRESH LIST
    </button>
  );

  const handleButtonClick = (routine) => {
    dispatch(runRoutineModal(true));
    setClickedRoutine(routine);
  };

  const routineListButtons = routineList.map((routine) => {
    const renderRoutineNumber = () => {
      if (routine.has_a) {
        return `#${routine.number}a`;
      }
      return `#${routine.number}`;
    };
    if (!!routine.score || routine.score === 0) {
      return (
        <button
          onClick={() => handleButtonClick(routine)}
          className="navbar__sidebar--button navbar__sidebar--button--disabled"
          key={routine.routine_id}
          type="button"
        >
          <span>{renderRoutineNumber()}</span>
          <span className="navbar__sidebar--routine">{routine.routine}</span>
        </button>
      );
    }
    if (routine.routine === currentRoutine.routine) {
      return (
        <button
          onClick={() => handleButtonClick(routine)}
          className="navbar__sidebar--button navbar__sidebar--button--active"
          key={routine.routine_id}
          type="button"
        >
          <span>{renderRoutineNumber()}</span>
          <span className="navbar__sidebar--routine">
            {currentRoutine.routine}
          </span>
        </button>
      );
    }
    if (routine.canceled) {
      return (
        <button
          onClick={() => handleButtonClick(routine)}
          className="navbar__sidebar--button navbar__sidebar--button--disabled"
          key={routine.routine_id}
          type="button"
        >
          <span>{renderRoutineNumber()}</span>
          <span className="navbar__sidebar--routine">{routine.routine}</span>
          <span className="float-right">CANCELED</span>
        </button>
      );
    }
    return (
      <button
        onClick={() => handleButtonClick(routine)}
        className="navbar__sidebar--button"
        key={routine.routine_id}
        type="button"
      >
        <span>{renderRoutineNumber()}</span>
        <span className="navbar__sidebar--routine">{routine.routine}</span>
      </button>
    );
  });

  const renderMenu = () => {
    if (!isSidebarOpen) {
      return (
        <div role="button" tabIndex="0" onClick={handleClick}>
          <FontAwesomeIcon icon={['fas', 'bars']} className="icon icon--menu" />
        </div>
      );
    }
    return (
      <div onClick={handleClick} role="button" tabIndex="0">
        <FontAwesomeIcon icon={['fas', 'times']} className="icon icon--menu" />
      </div>
    );
  };

  return (
    <>
      <Modal
        isShown={isRoutineModalShown}
        title="Alert"
        body="Are you sure you want to switch routines? Your changes will not be saved."
        numButtons="2"
        button1="GO BACK"
        button2="YES, SWITCH"
        location="scoring"
        clickedRoutine={clickedRoutine}
      />
      <ReactSidebar
        sidebar={
          <div>
            <Image
              className="img-event--small navbar__sidebar--heading"
              src={`${CONST.ASSETS_URL}/coda/${currentEvent.id}.svg`}
              alt={`${currentEvent.name} logo`}
            />
            <span className="navbar__sidebar--heading">{currentTourDate}</span>
            <div className="navbar__sidebar--butons">{routineListButtons}</div>
            {refreshButton}
          </div>
        }
        open={isSidebarOpen}
        onSetOpen={handleClick}
        sidebarClassName="navbar__sidebar"
        styles={{ overlay: { backgroundColor: 'rgba(0,0,0,0)' } }}
      >
        <div>{renderMenu()}</div>
      </ReactSidebar>
    </>
  );
}

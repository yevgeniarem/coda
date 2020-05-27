import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import ReactSidebar from 'react-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toggleSidebar, runSidebarModal } from '../redux/actions/appActions';
import SidebarModal from './modals/SidebarModal';
import RefreshButton from './buttons/RefreshButton';
import { formatTourDate, renderRoutineNumber } from '../utils/helpers';
import CONST from '../utils/constants';

export default function Sidebar() {
  const dispatch = useDispatch();
  const [
    { routineList, currentRoutine },
    { currentEvent, tourDates },
    inputs,
    { isSidebarModalShown },
    isSidebarOpen,
  ] = useSelector((state) => [
    state.routines,
    state.events,
    state.inputs,
    state.modals,
    state.sidebar,
  ]);
  const [clickedRoutine, setClickedRoutine] = useState({});
  const currentTourDate = formatTourDate(
    tourDates.find((city) => city.id === inputs.tourDateId),
  );

  const handleClick = () => dispatch(toggleSidebar());

  const handleButtonClick = (routine) => {
    setClickedRoutine(routine);
    dispatch(runSidebarModal(true));
  };

  const routineButtons =
    routineList &&
    routineList.map((routine) => {
      // const routineButtonTypes = [
      //   {
      //     type: 'disabled',
      //     conditions: !!routine.score || routine.score === 0,
      //     className: 'navbar__sidebar--button--disabled',
      //     text: routine.routine,
      //   },
      //   {
      //     type: 'active',
      //     conditions: routine.routine === currentRoutine.routine,
      //     className: 'navbar__sidebar--button--active',
      //     text: currentRoutine.routine,
      //   },
      //   {
      //     type: 'cancelled',
      //     conditions: routine.canceled,
      //     className: 'navbar__sidebar--button--disabled',
      //     text: routine.routine,
      //   },
      // ];

      if (!!routine.score || routine.score === 0) {
        return (
          <button
            onClick={() => handleButtonClick(routine)}
            className="navbar__sidebar--button navbar__sidebar--button--disabled"
            key={routine.routine_id}
            type="button"
          >
            <span>{renderRoutineNumber(routine)}</span>
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
            <span>{renderRoutineNumber(routine)}</span>
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
            <span>{renderRoutineNumber(routine)}</span>
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
          <span>{renderRoutineNumber(routine)}</span>
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
      <SidebarModal
        isShown={isSidebarModalShown}
        title="Alert"
        body="Are you sure you want to switch routines? Your changes will not be saved."
        button1="GO BACK"
        button2="YES, SWITCH"
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
            <div className="navbar__sidebar--buttons">{routineButtons}</div>
            <RefreshButton />
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

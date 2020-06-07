import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import ReactSidebar from 'react-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import {
  toggleSidebar,
  runModal,
  updateCurrentRoutine,
  resetScoring,
  closeSidebar,
} from '../redux/actions/appActions';
import RefreshButton from './buttons/RefreshButton';
import {
  formatTourDate,
  renderRoutineNumber,
  doesRoutineHaveScore,
} from '../utils/helpers';
import CONST from '../utils/constants';
import { Modal } from '../utils/models';

export default function Sidebar() {
  const dispatch = useDispatch();
  const [
    { routineList, currentRoutine },
    { currentEvent, tourDates },
    inputs,
    isSidebarOpen,
  ] = useSelector((state) => [
    state.routines,
    state.events,
    state.inputs,
    state.sidebar,
  ]);
  const currentTourDate = formatTourDate(
    tourDates.find((city) => city.id === inputs.tourDateId),
  );

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  const handleButtonClick = (routine) => {
    dispatch(
      runModal(
        new Modal({
          isModalShown: true,
          modalInfo: {
            title: 'Alert',
            body:
              'Are you sure you want to switch routines? Your changes will not be saved.',
            button1: 'GO BACK',
            button2: 'YES, SWITCH',
            confirm: async () => {
              await dispatch(updateCurrentRoutine(routine));
              Promise.all([dispatch(closeSidebar()), dispatch(resetScoring())]);
            },
            cancel: dispatch(closeSidebar()),
          },
        }),
      ),
    );
  };

  return (
    <ReactSidebar
      sidebar={
        <div>
          <Image
            className="img-event--small navbar__sidebar--heading"
            src={`${CONST.ASSETS_URL}/coda/${currentEvent.id}.svg`}
            alt={`${currentEvent.name} logo`}
          />
          <span className="navbar__sidebar--heading">{currentTourDate}</span>
          <div className="navbar__sidebar--buttons">
            {routineList &&
              routineList.map((routine) => {
                return (
                  <button
                    onClick={() => handleButtonClick(routine)}
                    className={classNames(
                      'navbar__sidebar--button',
                      (doesRoutineHaveScore(routine) || routine.canceled) &&
                        'navbar__sidebar--button--disabled',
                      routine.routine === currentRoutine.routine &&
                        'navbar__sidebar--button--active',
                    )}
                    key={routine.routine_id}
                    type="button"
                  >
                    <span>{renderRoutineNumber(routine)}</span>
                    <span className="navbar__sidebar--routine">
                      {routine.routine}
                    </span>
                  </button>
                );
              })}
          </div>
          <RefreshButton />
        </div>
      }
      open={isSidebarOpen}
      onSetOpen={handleClick}
      sidebarClassName="navbar__sidebar"
      styles={{ overlay: { backgroundColor: 'rgba(0,0,0,0)' } }}
    >
      <div role="button" tabIndex="0" onClick={handleClick}>
        <FontAwesomeIcon
          icon={isSidebarOpen ? ['fas', 'times'] : ['fas', 'bars']}
          className="icon icon--menu"
        />
      </div>
    </ReactSidebar>
  );
}

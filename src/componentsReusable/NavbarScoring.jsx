import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from 'react-bootstrap';

import { updateCurrentRoutine } from '../redux/actions/appActions';
import Sidebar from './Sidebar';
import JudgeProfile from './JudgeProfile';

export default function NavbarScoring() {
  const dispatch = useDispatch();
  const { routineList, currentRoutine } = useSelector(
    (state) => state.routines,
  );
  let title = `#${currentRoutine.number} - ${currentRoutine.routine}`;
  let subtitle = `${currentRoutine.age_division} • ${currentRoutine.performance_division} • ${currentRoutine.routine_category}`;

  if (!currentRoutine.routine_id) {
    title = 'COMPETITION IS OVER';
    subtitle = '';
  }

  useEffect(() => {
    if (!currentRoutine.routine_id) {
      dispatch(
        updateCurrentRoutine(
          (routineList &&
            routineList.find(
              (routine) =>
                !routine.canceled && !routine.score && routine.score !== 0,
            )) ||
            {},
        ),
      );
    }
  }, [dispatch, routineList, currentRoutine.routine_id]);

  return (
    <>
      <Navbar className="navbar">
        <div style={{ width: 174 }} />
        <div className="navbar__main-header">
          <h1 className="navbar__text">{title}</h1>
          <h2 className="navbar__subtext">{subtitle}</h2>
        </div>
        <JudgeProfile />
      </Navbar>
      <Sidebar />
    </>
  );
}

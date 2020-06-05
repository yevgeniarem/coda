import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from 'react-bootstrap';

import { updateCurrentRoutine } from '../redux/actions/appActions';
import Sidebar from './Sidebar';
import JudgeProfile from './JudgeProfile';
import { findNextAvailableRoutine, initNavbarContent } from '../utils/helpers';

export default function NavbarScoring() {
  const dispatch = useDispatch();
  const { routineList, currentRoutine } = useSelector(
    (state) => state.routines,
  );

  const content = initNavbarContent(currentRoutine);

  useEffect(() => {
    if (currentRoutine.routine_id) return;
    dispatch(
      updateCurrentRoutine(
        (routineList && findNextAvailableRoutine(routineList)) || {},
      ),
    );
    // eslint-disable-next-line
  }, [routineList]);

  return (
    <>
      <Navbar className="navbar">
        <div style={{ width: 174 }} />
        <div className="navbar__main-header">
          <h1 className="navbar__text">{content.title}</h1>
          <h2 className="navbar__subtext">{content.subtitle}</h2>
        </div>
        <JudgeProfile />
      </Navbar>

      <Sidebar />
    </>
  );
}

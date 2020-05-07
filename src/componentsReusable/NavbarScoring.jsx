import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Image } from 'react-bootstrap';

import { updateCurrentRoutine } from '../redux/actions/appActions';
import Dropdown from './Dropdown';
import Sidebar from './Sidebar';
import CONST from '../utils/constants';

export default function NavbarScoring() {
  const dispatch = useDispatch();
  const { routineList, currentRoutine } = useSelector(
    (state) => state.routines,
  );
  const { judge: judgeId, position, judgeList } = useSelector(
    (state) => state.inputs,
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
          routineList.find(
            (routine) =>
              !routine.canceled && !routine.score && routine.score !== 0,
          ) || {},
        ),
      );
    }
  }, [dispatch, routineList, currentRoutine.routine_id]);

  const findJudgeNameById = () => {
    const index = judgeList.map((judge) => judge.id === judgeId).indexOf(true);
    const currentJudge = judgeList[index] || {};
    return currentJudge.judge.toUpperCase();
  };

  const renderJudgeProfile = () => (
    <div className="navbar--judge-profile-container">
      <div className="row align-items-center">
        <div className="col col-auto navbar__col navbar--judge-profile-text">
          {`#${position} ${findJudgeNameById()}`}
        </div>
        <Image
          className="col col-auto navbar__col img--judge"
          src={`${CONST.ASSETS_URL}/staff/50x50/${judgeId}.jpg`}
          roundedCircle
        />
        <Dropdown />
      </div>
    </div>
  );

  return (
    <>
      <Navbar className="navbar">
        <div style={{ width: 174 }} />
        <div className="navbar__main-header">
          <h1 className="navbar__text">{title}</h1>
          <h2 className="navbar__subtext">{subtitle}</h2>
        </div>
        <>{renderJudgeProfile()}</>
      </Navbar>
      <Sidebar />
    </>
  );
}

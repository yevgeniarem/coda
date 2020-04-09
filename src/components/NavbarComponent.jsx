import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentRoutine } from '../redux/actions/appActions';
import { Navbar, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Sidebar from 'react-sidebar';
import moment from 'moment';

const NavbarComponent = ({ type, text, name }) => {
  const { currentEvent, eventCitiesList } = useSelector(state => state.events);
  const { routineList, currentRoutine } = useSelector(state => state.routines);
  const { judge: judgeId, position, judgeList, tourDateId } = useSelector(
    state => state.inputs
  );
  const [menuIsClicked, setMenuIsClicked] = useState(false);
  let dates,
    currentTourDate,
    judgeProfile,
    renderMenu = () => {},
    handleClick = () => {},
    findJudgeNameById = () => {},
    routineListButtons,
    refreshButton,
    subtext = '';
  const dispatch = useDispatch();

  const navClassNames = {
    chooseYourEvent: 'navbar--choose-your-event',
    chooseYourCity: 'navbar--choose-your-city',
    scoreSheet: 'navbar--scoreSheet'
  };

  useEffect(() => {
    if (name === 'judge5')
      dispatch(
        updateCurrentRoutine(
          routineList.find(
            routine =>
              !routine.cancelled && !routine.score && routine.score !== 0
          ) || {}
        )
      );
  }, [dispatch, routineList, name]);

  if (name === 'judge5') {
    findJudgeNameById = () => {
      let index = judgeList.map(judge => judge.id === judgeId).indexOf(true);
      let currentJudge = judgeList[index] || {};
      return currentJudge.judge.toUpperCase();
    };

    judgeProfile = (
      <>
        <div className="row align-items-center">
          <div className="col col-auto navbar__col navbar--judge-profile-text">
            {`#${position} ${findJudgeNameById()}`}
          </div>
          <Image
            className="col col-auto navbar__col img--judge"
            src={`https://assets.dance360.com/staff/50x50/${judgeId}.jpg`}
            roundedCircle
          />
          <FontAwesomeIcon
            icon={['fas', 'caret-down']}
            className="col col-auto navbar__col navbar__col--last"
          />
        </div>
      </>
    );

    handleClick = () => {
      setMenuIsClicked(!menuIsClicked);
    };

    renderMenu = () => {
      if (!menuIsClicked) {
        return (
          <div onClick={handleClick}>
            <FontAwesomeIcon
              icon={['fas', 'bars']}
              className="icon icon--menu"
            />
          </div>
        );
      } else {
        return (
          <div onClick={handleClick}>
            <FontAwesomeIcon
              icon={['fas', 'times']}
              className="icon icon--menu"
            />
          </div>
        );
      }
    };

    text = `#${currentRoutine.number} - ${currentRoutine.routine}`;
    subtext = `${currentRoutine.age_division} • ${currentRoutine.performance_division} • ${currentRoutine.routine_category}`;

    const formatDate = tourDate => {
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
      return tourDate.eventCity + ' - ' + dates;
    };
    currentTourDate = formatDate(
      eventCitiesList.find(city => city.id === tourDateId)
    );

    const handleButtonClick = routine => {
      dispatch(updateCurrentRoutine(routine));
    };

    routineListButtons = routineList.map(routine => {
      const renderRoutineNumber = () => {
        if (routine.has_a) {
          return `#${routine.number}a`;
        } else {
          return `#${routine.number}`;
        }
      };
      if (routine.routine === currentRoutine.routine) {
        return (
          <button
            onClick={() => handleButtonClick(routine)}
            className="navbar__sidebar--button navbar__sidebar--button--active"
            key={routine.routine_id}
          >
            <span>{renderRoutineNumber()}</span>
            <span className="navbar__sidebar--routine">
              {currentRoutine.routine}
            </span>
          </button>
        );
      }
      return (
        <button
          onClick={() => handleButtonClick(routine)}
          className="navbar__sidebar--button"
          key={routine.routine_id}
        >
          <span>{renderRoutineNumber()}</span>
          <span className="navbar__sidebar--routine">{routine.routine}</span>
        </button>
      );
    });

    refreshButton = (
      <button
        type="button"
        className="button action-button--submit action-button--green"
      >
        <FontAwesomeIcon
          icon={['fas', 'redo']}
          className="icon--refresh"
        ></FontAwesomeIcon>{' '}
        REFRESH LIST
      </button>
    );
  }

  return (
    <>
      <Navbar className={classNames('navbar', navClassNames[type])}>
        <div className="navbar__main-header">
          <h1 className="navbar__text">{text.toUpperCase()}</h1>
          <h2 className="navbar__subtext">{subtext}</h2>
        </div>
        <div className="navbar--judge-profile">{judgeProfile}</div>
      </Navbar>
      <Sidebar
        sidebar={
          <div>
            <Image
              className="img-event--small navbar__sidebar--heading"
              src={`https://assets.dance360.com/coda/${currentEvent.id}.svg`}
              alt={`${currentEvent.name} logo`}
            />
            <span className="navbar__sidebar--heading">{currentTourDate}</span>
            <div className="navbar__sidebar--butons">{routineListButtons}</div>
            {refreshButton}
          </div>
        }
        open={menuIsClicked}
        onSetOpen={handleClick}
        sidebarClassName="navbar__sidebar"
        styles={{ overlay: { backgroundColor: 'rgba(0,0,0,0)' } }}
      >
        <div>{renderMenu()}</div>
      </Sidebar>
    </>
  );
};

export default NavbarComponent;

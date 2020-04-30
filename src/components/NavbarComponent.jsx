import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import {
  updateCurrentRoutine,
  runRoutineModal,
  toggleSidebar,
  updateRoutineList,
} from '../redux/actions/appActions';
import DropdownComponent from './DropdownComponent';
import ModalComponent from './ModalComponent';

const NavbarComponent = ({ type, text, name }) => {
  const { currentEvent, eventCitiesList } = useSelector(
    (state) => state.events,
  );
  const { routineList, currentRoutine } = useSelector(
    (state) => state.routines,
  );
  const {
    judge: judgeId,
    position,
    judgeList,
    tourDateId,
    competitionGroup,
  } = useSelector((state) => state.inputs);
  const isSidebarOpen = useSelector((state) => state.sidebar);
  const { isRoutineModalShown } = useSelector((state) => state.modals);
  const [clickedRoutine, setClickedRoutine] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  let dates;
  let currentTourDate;
  let renderMenu = () => {};
  let handleClick = () => {};
  let findJudgeNameById = () => {};
  let conditionalStylingDiv = () => {};
  let renderJudgeProfile = () => {};
  let routineListButtons;
  let refreshButton;
  let subtext = '';
  const dispatch = useDispatch();
  let title = text;

  const navClassNames = {
    chooseYourEvent: 'navbar--choose-your-event',
    chooseYourCity: 'navbar--choose-your-city',
    scoreSheet: 'navbar--scoreSheet',
  };

  useEffect(() => {
    if (name === 'judge5' && !currentRoutine.routine_id) {
      dispatch(
        updateCurrentRoutine(
          routineList.find(
            (routine) =>
              !routine.canceled && !routine.score && routine.score !== 0,
          ) || {},
        ),
      );
    }
  }, [dispatch, routineList, name, currentRoutine.routine_id]);

  if (name === 'judge5') {
    findJudgeNameById = () => {
      const index = judgeList
        .map((judge) => judge.id === judgeId)
        .indexOf(true);
      const currentJudge = judgeList[index] || {};
      return currentJudge.judge.toUpperCase();
    };

    renderJudgeProfile = () => (
      <div className="navbar--judge-profile-container">
        <div className="row align-items-center navbar--judge-profile">
          <div className="col col-auto navbar__col navbar--judge-profile-text">
            {`#${position} ${findJudgeNameById()}`}
          </div>
          <Image
            className="col col-auto navbar__col img--judge"
            src={`https://assets.dance360.com/staff/50x50/${judgeId}.jpg`}
            roundedCircle
          />
          <DropdownComponent />
        </div>
      </div>
    );

    handleClick = () => {
      dispatch(toggleSidebar());
    };

    renderMenu = () => {
      if (!isSidebarOpen) {
        return (
          <div role="button" tabIndex="0" onClick={handleClick}>
            <FontAwesomeIcon
              icon={['fas', 'bars']}
              className="icon icon--menu"
            />
          </div>
        );
      }
      return (
        <div onClick={handleClick} role="button" tabIndex="0">
          <FontAwesomeIcon
            icon={['fas', 'times']}
            className="icon icon--menu"
          />
        </div>
      );
    };

    title = `#${currentRoutine.number} - ${currentRoutine.routine}`;
    subtext = `${currentRoutine.age_division} • ${currentRoutine.performance_division} • ${currentRoutine.routine_category}`;

    if (!currentRoutine.routine_id) {
      title = 'COMPETITION IS OVER';
      subtext = '';
    }

    const formatDate = (tourDate) => {
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
    currentTourDate = formatDate(
      eventCitiesList.find((city) => city.id === tourDateId),
    );

    const handleButtonClick = (routine) => {
      dispatch(runRoutineModal(true));
      setClickedRoutine(routine);
    };

    routineListButtons = routineList.map((routine) => {
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

    const handleRefresh = () => {
      setIsFetching(true);
      axios
        .get('https://api.d360test.com/api/coda/routines', {
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
          console.log(error);
        });
    };

    refreshButton = (
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

    conditionalStylingDiv = () => <div style={{ width: 165 }} />;
  }

  return (
    <>
      <ModalComponent
        isShown={isRoutineModalShown}
        title="Alert"
        body="Are you sure you want to switch routines? Your changes will not be saved."
        numButtons="2"
        button1="GO BACK"
        button2="YES, SWITCH"
        location="judge5"
        clickedRoutine={clickedRoutine}
      />
      <Navbar className={classNames('navbar', navClassNames[type])}>
        <>{conditionalStylingDiv()}</>
        <div className="navbar__main-header">
          <h1 className="navbar__text">{title.toUpperCase()}</h1>
          <h2 className="navbar__subtext">{subtext}</h2>
        </div>
        <div>{renderJudgeProfile()}</div>
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
        open={isSidebarOpen}
        onSetOpen={handleClick}
        sidebarClassName="navbar__sidebar"
        styles={{ overlay: { backgroundColor: 'rgba(0,0,0,0)' } }}
      >
        <div>{renderMenu()}</div>
      </Sidebar>
    </>
  );
};

NavbarComponent.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  name: PropTypes.string,
};

NavbarComponent.defaultProps = {
  text: null,
  name: null,
};

export default NavbarComponent;

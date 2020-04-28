import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  invalidLogin,
  runJudgeModal,
  runRoutineModal,
  updateCurrentRoutine,
  closeSidebar,
  runSubmitModal,
} from '../redux/actions/appActions';

const ModalComponent = ({
  isShown,
  title,
  body,
  numButtons,
  button1,
  button2,
  location,
  clickedRoutine,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const { currentEvent } = useSelector((state) => state.events);
  let {
    competitionGroup,
    tourDateId,
    judgeList,
    judge: currentJudge,
    position,
    teacherJudge,
  } = useSelector((state) => state.inputs);
  const { currentRoutine, routineList } = useSelector(
    (state) => state.routines,
  );
  let {
    note,
    score,
    not_friendly,
    i_choreographed,
    is_coda,
    buttons,
    strongest_level_1_id,
    weakest_level_1_id,
  } = useSelector((state) => state.scoring);

  useEffect(() => {
    if (isShown) setShow(true);
  }, [isShown]);

  const handleClose = () => {
    if (location === 'judge1') dispatch(invalidLogin(false));
    if (location === 'judge4') dispatch(runJudgeModal(''));
    if (location === 'judge5') dispatch(runRoutineModal(false));
    if (location === 'scoring-breakdown-comp') dispatch(runSubmitModal(false));
    setShow(false);
  };

  if (!note) {
    const judgeObj = judgeList.find((judge) => judge.id === currentJudge) || {};
    note = judgeObj.default_notes;
    if (!judgeObj.default_notes) note = '';
  }

  const foundationButtons = buttons.filter(
    (button) => button.level_1_id === 11,
  );
  const performanceButtons = buttons.filter(
    (button) => button.level_1_id === 12,
  );
  const creativeButtons = buttons.filter((button) => button.level_1_id === 13);

  const calculatePercentage = (b) => {
    const array = b.map((button) => button.good) || [];
    const percentage =
      (array.filter((e) => e === true).length / array.length) * 100;
    if (isNaN(percentage)) return 50;
    return Math.floor(percentage);
  };

  const foundationPercentage = calculatePercentage(foundationButtons);
  const performancePercentage = calculatePercentage(performanceButtons);
  const creativePercentage = calculatePercentage(creativeButtons);

  const calculateStrongest = () => {
    const max = Math.max(
      foundationPercentage,
      performancePercentage,
      creativePercentage,
    );

    if (foundationPercentage === max) return 11;
    if (performancePercentage === max) return 12;
    if (creativePercentage === max) return 13;
    return null;
  };

  const calculateWeakest = () => {
    const min = Math.min(
      foundationPercentage,
      performancePercentage,
      creativePercentage,
    );

    if (foundationPercentage === min) return 11;
    if (performancePercentage === min) return 12;
    if (creativePercentage === min) return 13;
    return null;
  };

  const renderButtons = () => {
    if (numButtons === '1') {
      return (
        <Button
          variant="secondary"
          onClick={handleClose}
          className="button action-button--navigation action-button--blue"
        >
          {button1}
        </Button>
      );
    }
    if (numButtons === '2') {
      return (
        <>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              dispatch(closeSidebar());
            }}
            className="button action-button--navigation action-button--grey"
          >
            {button1}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              if (location === 'judge4') history.push('/Judge5');
              if (location === 'judge5') {
                dispatch(updateCurrentRoutine(clickedRoutine));
              }
              if (location === 'scoring-breakdown-comp') {
                strongest_level_1_id = calculateStrongest();
                weakest_level_1_id = calculateWeakest();

                axios
                  .post(`https://api.d360test.com/api/coda/score`, {
                    isTabulator: false,
                    competition_group_id: competitionGroup,
                    date_routine_id: currentRoutine.date_routine_id,
                    event_id: currentEvent.id,
                    tour_date_id: tourDateId,
                    data: {
                      online_scoring_id: currentRoutine.online_scoring_id,
                      staff_id: currentJudge,
                      note,
                      score,
                      not_friendly,
                      i_choreographed,
                      position,
                      teacher_critique: teacherJudge,
                      is_coda,
                      buttons,
                      strongest_level_1_id,
                      weakest_level_1_id,
                    },
                  })
                  .then(() => {
                    axios
                      .post('https://api.d360test.com/api/socket-scoring', {
                        tour_date_id: tourDateId,
                        coda: true,
                        data: {
                          competition_group_id: competitionGroup,
                          date_routine_id: currentRoutine.date_routine_id,
                        },
                      })
                      .then(() => {
                        const routineIndex = routineList.findIndex(
                          (routine) =>
                            routine.routine_id === currentRoutine.routine_id,
                        );
                        const newRoutineArr = routineList.slice(
                          routineIndex + 1,
                        );
                        const newCurrentRoutine = newRoutineArr.find(
                          (routine) =>
                            !routine.canceled &&
                            !routine.score &&
                            routine.score !== 0,
                        );
                        dispatch(updateCurrentRoutine(newCurrentRoutine));
                        window.scrollTo(0, 0);
                      })
                      .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                      });
                  })
                  .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                  });
              }
              dispatch(closeSidebar());
            }}
            className="button action-button--navigation action-button--blue"
          >
            {button2}
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <Modal className="modal" show={show} onHide={handleClose} centered>
      <Modal.Header className="modal__header">
        <Modal.Title className="modal__title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">{body}</Modal.Body>
      <Modal.Footer className="modal__footer">{renderButtons()}</Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;

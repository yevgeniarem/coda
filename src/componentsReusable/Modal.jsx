import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  invalidLogin,
  runJudgeModal,
  runRoutineModal,
  updateCurrentRoutine,
  closeSidebar,
  runSubmitModal,
  resetScoring,
  postScore,
} from '../redux/actions/appActions';

export default function Modal({
  isShown,
  title,
  body,
  numButtons,
  button1,
  button2,
  location,
  clickedRoutine,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [
    { currentEvent },
    {
      competitionGroup,
      tourDateId,
      judgeList,
      judge: currentJudge,
      position,
      teacherJudge,
    },
    { currentRoutine, routineList },
    { note, score, not_friendly, i_choreographed, is_coda, buttons },
  ] = useSelector((state) => [
    state.events,
    state.inputs,
    state.routines,
    state.scoring,
  ]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isShown) setShow(true);
  }, [isShown]);

  const handleClose = () => {
    if (location === 'login') dispatch(invalidLogin(false));
    if (location === 'judges') dispatch(runJudgeModal(''));
    if (location === 'scoring') dispatch(runRoutineModal(false));
    if (location === 'scoring-breakdown-comp') dispatch(runSubmitModal(false));
    setShow(false);
  };

  const foundationButtons =
    buttons && buttons.filter((button) => button.level_1_id === 11);
  const performanceButtons =
    buttons && buttons.filter((button) => button.level_1_id === 12);
  const creativeButtons =
    buttons && buttons.filter((button) => button.level_1_id === 13);

  const calculatePercentage = (b) => {
    const array = (b && b.map((button) => button.good)) || [];
    const percentage =
      (array.filter((e) => e === true).length / array.length) * 100;
    if (Number.isNaN(percentage)) return 50;
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
              handleClose(); // QUESTION: I shouldn't add Promise.all here, right?
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
              if (location === 'judges') history.push('/scoring');
              if (location === 'scoring') {
                dispatch(updateCurrentRoutine(clickedRoutine));
              }
              if (location === 'scoring-breakdown-comp') {
                const strongest_level_1_id = calculateStrongest();
                const weakest_level_1_id = calculateWeakest();

                let finalNote = note;
                if (!finalNote) {
                  const judgeObj = judgeList.find(
                    (judge) => judge.id === currentJudge,
                  );
                  finalNote = judgeObj.default_notes;

                  if (!judgeObj.default_notes) finalNote = '';
                }

                const submitScore = async () => {
                  try {
                    dispatch(
                      postScore({
                        competitionGroup,
                        currentRoutine,
                        currentEvent,
                        tourDateId,
                        currentJudge,
                        finalNote,
                        score,
                        not_friendly,
                        i_choreographed,
                        position,
                        teacherJudge,
                        is_coda,
                        buttons,
                        strongest_level_1_id,
                        weakest_level_1_id,
                        routineList,
                      }),
                    );
                  } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error(err);
                  }
                };
                submitScore();
              }
              Promise.all([dispatch(closeSidebar()), dispatch(resetScoring())]); // QUESTION: did I do this correctly?
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
    <BootstrapModal className="modal" show={show} onHide={handleClose} centered>
      <BootstrapModal.Header className="modal__header">
        <BootstrapModal.Title className="modal__title">
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="modal__body">{body}</BootstrapModal.Body>
      <BootstrapModal.Footer className="modal__footer">
        {renderButtons()}
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

Modal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  numButtons: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string,
  location: PropTypes.string.isRequired,
  clickedRoutine: PropTypes.shape({}),
};

Modal.defaultProps = {
  button2: 'NEXT',
  clickedRoutine: null,
};

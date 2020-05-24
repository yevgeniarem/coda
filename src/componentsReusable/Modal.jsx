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
import {
  filterButtonsById,
  calculateGoodBtnPercentage,
  calculateStrongestCategory,
  calculateWeakestCategory,
} from '../utils/helpers';
import { buttonCategories } from '../utils/constants';

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

  const buttonsOrdByCategories = buttonCategories.map((category) => ({
    name: category.name,
    buttons: filterButtonsById(buttons, category.id),
  }));

  const buttonPercentages = buttonsOrdByCategories.map((b) => ({
    name: b.name,
    percentage: calculateGoodBtnPercentage(b.buttons),
  }));

  const handleClick = async () => {
    await handleClose();
    if (location === 'judges') history.push('/scoring');
    if (location === 'scoring') dispatch(updateCurrentRoutine(clickedRoutine));
    if (location === 'scoring-breakdown-comp') {
      let finalNote = note;
      if (!finalNote) {
        const judgeObj = judgeList.find((judge) => judge.id === currentJudge);
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
              strongest_level_1_id: calculateStrongestCategory(
                buttonPercentages,
              ),
              weakest_level_1_id: calculateWeakestCategory(buttonPercentages),
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
    Promise.all([dispatch(closeSidebar()), dispatch(resetScoring())]);
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
            onClick={async () => {
              await dispatch(closeSidebar());
              handleClose();
            }}
            className="button action-button--navigation action-button--grey"
          >
            {button1}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClick}
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
  body: PropTypes.string,
  numButtons: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string,
  location: PropTypes.string.isRequired,
  clickedRoutine: PropTypes.shape({}),
};

Modal.defaultProps = {
  button2: 'NEXT',
  clickedRoutine: null,
  body: null,
};

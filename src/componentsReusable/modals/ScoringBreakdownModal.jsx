import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import {
  closeSidebar,
  runScoringBreakdownModal,
  resetScoring,
  postScore,
} from '../../redux/actions/appActions';
import {
  filterButtonsById,
  calculateGoodBtnPercentage,
  calculateStrongestCategory,
  calculateWeakestCategory,
  applyDefaultNote,
} from '../../utils/helpers';
import { buttonCategories } from '../../utils/constants';

export default function Modal({ isShown, title, body, button1, button2 }) {
  const dispatch = useDispatch();
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

  const handleClose = async () => {
    await dispatch(runScoringBreakdownModal(false));
    setShow(false);
  };

  const buttonsOrdByCategories = buttonCategories.map((bc) => ({
    name: bc.name,
    buttons: filterButtonsById(buttons, bc.id),
  }));

  const buttonPercentages = buttonsOrdByCategories.map((b) => ({
    name: b.name,
    percentage: calculateGoodBtnPercentage(b.buttons),
  }));

  const handleClick = async () => {
    let finalNote = note;
    if (!note) finalNote = applyDefaultNote(judgeList, currentJudge);

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
            strongest_level_1_id: calculateStrongestCategory(buttonPercentages),
            weakest_level_1_id: calculateWeakestCategory(buttonPercentages),
            routineList,
          }),
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };
    await submitScore();
    Promise.all([
      dispatch(closeSidebar()),
      dispatch(resetScoring()),
      handleClose(),
    ]);
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
        <Button
          variant="secondary"
          onClick={() => Promise.all([dispatch(closeSidebar()), handleClose()])}
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
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

Modal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
};

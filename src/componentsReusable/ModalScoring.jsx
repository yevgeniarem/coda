import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { postScore } from '../redux/actions/appActions';
import Modal from './Modal';

export default function ModalScoring({
  isShown,
  title,
  body,
  numButtons,
  button1,
  button2,
  location,
}) {
  const dispatch = useDispatch();
  const { currentEvent } = useSelector((state) => state.events);
  const {
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
  const {
    note,
    score,
    not_friendly,
    i_choreographed,
    is_coda,
    buttons,
  } = useSelector((state) => state.scoring);

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

  const strongest_level_1_id = calculateStrongest();
  const weakest_level_1_id = calculateWeakest();

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

  return (
    <Modal
      isShown={isShown}
      title={title}
      body={body}
      numButtons={numButtons}
      button1={button1}
      button2={button2}
      location={location}
    />
  );
}

ModalScoring.propTypes = {
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  numButtons: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

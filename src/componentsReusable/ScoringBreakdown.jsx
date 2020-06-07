import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  updateScore,
  runModal,
  toggleNotFriendly,
  toggleIChoreographed,
  updateNote,
  getRoutineList,
  resetScoring,
  postScore,
  closeSidebar,
} from '../redux/actions/appActions';
import ScoringPopover from './ScoringPopover';
import SubmitButton from './buttons/SubmitButton';
import { checkboxInputs, buttonCategories } from '../utils/constants';
import {
  filterButtonsByLevel,
  calculateGoodBtnPercentage,
  calculateStrongestCategory,
  calculateWeakestCategory,
  applyDefaultNote,
} from '../utils/helpers';
import { Modal } from '../utils/models';

export default function ScoringBreakdown() {
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
    inputs,
  ] = useSelector((state) => [
    state.events,
    state.inputs,
    state.routines,
    state.scoring,
    state.inputs,
  ]);
  const [noteValue, setNoteValue] = useState(note);

  useEffect(() => {
    setNoteValue(note);
  }, [note]);

  const buttonsOrdByCategories = buttonCategories.map((bc) => ({
    name: bc.name,
    buttons: filterButtonsByLevel(buttons, bc.id),
  }));

  const buttonPercentages = buttonsOrdByCategories.map((b) => ({
    name: b.name,
    percentage: calculateGoodBtnPercentage(b.buttons),
  }));

  const handleClick = {
    minus: () => {
      if (score === 0) return;
      dispatch(updateScore(score - 1));
    },
    plus: () => {
      if (score === 100) return;
      dispatch(updateScore(score + 1));
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Promise.all([
      dispatch(
        runModal(
          new Modal({
            isModalShown: true,
            modalInfo: {
              title: 'Alert',
              body: 'Are you sure you want to save?',
              button1: 'GO BACK',
              button2: 'YES, SAVE',
              confirm: async () => {
                await dispatch(
                  postScore({
                    competitionGroup,
                    currentRoutine,
                    currentEvent,
                    tourDateId,
                    currentJudge,
                    finalNote:
                      noteValue || applyDefaultNote(judgeList, currentJudge),
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
                    weakest_level_1_id: calculateWeakestCategory(
                      buttonPercentages,
                    ),
                    routineList,
                  }),
                );
                Promise.all([
                  dispatch(getRoutineList(inputs)),
                  dispatch(closeSidebar()),
                  dispatch(resetScoring()),
                ]);
              },
              cancel: () => {
                dispatch(closeSidebar());
              },
            },
          }),
        ),
      ),
      dispatch(updateNote(noteValue)),
      dispatch(getRoutineList(inputs)),
    ]);
  };

  const handleInputChange = async (event) => {
    if (event.target.name === 'not_friendly') dispatch(toggleNotFriendly());
    if (event.target.name === 'i_choreographed') {
      await dispatch(toggleIChoreographed());
      if (i_choreographed === true) dispatch(updateScore(100));
      if (i_choreographed === false) dispatch(updateScore(0));
    }
  };

  const handleTextChange = (event) => {
    setNoteValue(event.target.value);
  };

  return (
    <div className="scoring-breakdown__container">
      <div className="scoring-breakdown__title">SCORING BREAKDOWN</div>
      <ScoringPopover />
      <div className="scoring-breakdown__score-container container">
        <div className="row align-items-center justify-content-center">
          <FontAwesomeIcon
            icon={['fas', 'minus']}
            className="col-2 scoring-breakdown--minus-icon"
            onClick={() => handleClick.minus()}
          />
          <div className="col-8">
            <span className="scoring-breakdown--score">{score}</span>
          </div>
          <FontAwesomeIcon
            icon={['fas', 'plus']}
            className="col-2 scoring-breakdown--plus-icon"
            onClick={() => handleClick.plus()}
          />
        </div>
      </div>
      <div className="scoring-breakdown__title">ADD NOTES</div>
      <div className="scoring-breakdown--notes-container">
        <form onSubmit={handleSubmit}>
          <textarea
            className="scoring-breakdown__textarea"
            value={noteValue}
            onChange={handleTextChange}
          />
          {checkboxInputs.map((i) => (
            <div className="scoring-breakdown__checkbox" key={i.name}>
              <label
                className="scoring-breakdown__checkbox--text"
                htmlFor={i.name}
              >
                <input
                  name={i.name}
                  id={i.name}
                  type="checkbox"
                  checked={
                    i.name === 'not_friendly' ? not_friendly : i_choreographed
                  }
                  onChange={handleInputChange}
                  className="scoring-breakdown__checkbox--check"
                />
                {'  '}
                {i.text}
              </label>
            </div>
          ))}

          <SubmitButton
            text="SUBMIT"
            classes={['action-button--scoring-submit']}
          />
        </form>
      </div>
    </div>
  );
}

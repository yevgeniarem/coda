import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  updateScore,
  runSubmitModal,
  toggleNotFriendly,
  toggleIChoreographed,
  updateNote,
  getRoutineList,
} from '../redux/actions/appActions';
import Modal from './Modal';
import ScoringPopover from './ScoringPopover';
import SubmitButton from './buttons/SubmitButton';

export default function ScoringBreakdown() {
  const dispatch = useDispatch();
  const [
    { score, not_friendly, i_choreographed, note },
    inputs,
    { isSubmitModalShown },
  ] = useSelector((state) => [state.scoring, state.inputs, state.modals]);
  const [noteValue, setNoteValue] = useState(note);

  useEffect(() => {
    setNoteValue(note);
  }, [note]);

  const handleClick = (action) => {
    if (action === 'minus') {
      if (score === 0) return;
      dispatch(updateScore(score - 1));
    }
    if (action === 'plus') {
      if (score === 100) return;
      dispatch(updateScore(score + 1));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Promise.all([
      dispatch(runSubmitModal(true)),
      dispatch(updateNote(noteValue)),
      dispatch(getRoutineList(inputs)),
    ]); // QUESTION: did I do this correctly?
  };

  const handleInputChange = (event) => {
    if (event.target.name === 'not_friendly') dispatch(toggleNotFriendly());
    if (event.target.name === 'i_choreographed') {
      dispatch(toggleIChoreographed());
      if (i_choreographed === true) dispatch(updateScore(100));
      if (i_choreographed === false) dispatch(updateScore(0));
    }
  };

  const handleTextChange = (event) => {
    setNoteValue(event.target.value);
  };

  const checkboxInputs = [
    {
      name: 'not_friendly',
      text: 'Routine is not family-friendly',
      checked: not_friendly,
    },
    {
      name: 'i_choreographed',
      text: 'I choreographed this routine',
      checked: i_choreographed,
    },
  ];

  return (
    <>
      <Modal
        isShown={isSubmitModalShown}
        title="Alert"
        body="Are you sure you want to save?"
        numButtons="2"
        button1="GO BACK"
        button2="YES, SAVE"
        location="scoring-breakdown-comp"
      />

      <div className="scoring-breakdown__container">
        <div className="scoring-breakdown__title">SCORING BREAKDOWN</div>
        <ScoringPopover />
        <div className="scoring-breakdown__score-container container">
          <div className="row align-items-center justify-content-center">
            <FontAwesomeIcon
              icon={['fas', 'minus']}
              className="col-2 scoring-breakdown--minus-icon"
              onClick={() => handleClick('minus')}
            />
            <div className="col-8">
              <span className="scoring-breakdown--score">{score}</span>
            </div>
            <FontAwesomeIcon
              icon={['fas', 'plus']}
              className="col-2 scoring-breakdown--plus-icon"
              onClick={() => handleClick('plus')}
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
                    checked={i.checked}
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
    </>
  );
}

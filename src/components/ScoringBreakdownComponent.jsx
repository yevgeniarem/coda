import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import {
  updateScore,
  runSubmitModal,
  updateScoringBreakdown,
  toggleNotFriendly,
  toggleIChoreographed,
  updateNote,
  updateRoutineList,
} from '../redux/actions/appActions';
import ModalComponent from './ModalComponent';

const ScoringBreakdownComponent = () => {
  const dispatch = useDispatch();
  let { score, scoring_breakdown, not_friendly, i_choreographed } = useSelector(
    (state) => state.scoring
  );
  const { tourDateId, competitionGroup, position } = useSelector(
    (state) => state.inputs
  );
  const { isSubmitModalShown } = useSelector((state) => state.modals);
  const eventId = useSelector((state) => state.events.currentEvent.id);
  const [note, setNote] = useState('');

  useEffect(() => {
    axios // data for scoring breakdown
      .get('https://api.d360test.com/api/coda/scoring-breakdown', {
        params: {
          event_id: eventId,
        },
      })
      .then((response) => {
        dispatch(updateScoringBreakdown(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId, dispatch]);

  const handleClick = (action) => {
    if (action === 'minus') {
      if (score === 0) return;
      dispatch(updateScore(--score));
    }
    if (action === 'plus') {
      if (score === 100) return;
      dispatch(updateScore(++score));
    }
  };

  const renderScoringBreakdown = scoring_breakdown.map((award) => {
    return (
      <div className="score-popover__list-item" key={award.id}>
        <div className="row">
          <div className="col">{award.award}</div>
          <div className="col-auto">{`${award.lowest}-${award.highest}`}</div>
        </div>
      </div>
    );
  });

  const popover = (
    <Popover className="score-popover">
      <Popover.Title className="score-popover__header" as="h3">
        SCORING BREAKDOWN
      </Popover.Title>
      <Popover.Content className="p-0">
        <div className="container-fluid p-0">
          <div className="score-popover__list-header">
            <div className="row">
              <div className="col">AWARD</div>
              <div className="col-auto">SCORE</div>
            </div>
          </div>
          <div className="score-popover__list-items">
            {renderScoringBreakdown}
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(runSubmitModal(true));
    dispatch(updateNote(note));
    axios
      .get(`https://api.d360test.com/api/coda/routines`, {
        params: {
          tour_date_id: tourDateId,
          competition_group_id: competitionGroup,
          position,
        },
      })
      .then((response) => {
        dispatch(updateRoutineList(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
    setNote(event.target.value);
  };

  return (
    <>
      <ModalComponent
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
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={popover}
          rootClose={true}
        >
          <FontAwesomeIcon
            icon={['fas', 'info-circle']}
            className="scoring-breakdown--info-icon"
          />
        </OverlayTrigger>
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
              value={note}
              onChange={handleTextChange}
            />
            <div className="scoring-breakdown__checkbox">
              <label className="scoring-breakdown__checkbox--text">
                <input
                  name="not_friendly"
                  type="checkbox"
                  checked={not_friendly}
                  onChange={handleInputChange}
                  className="scoring-breakdown__checkbox--check"
                />
                {'  '}
                Routine is not family-friendly
              </label>
            </div>
            <div className="scoring-breakdown__checkbox">
              <label className="scoring-breakdown__checkbox--text">
                <input
                  name="i_choreographed"
                  type="checkbox"
                  checked={i_choreographed}
                  onChange={handleInputChange}
                  className="scoring-breakdown__checkbox--check"
                />
                {'  '}I choreographed this routine
              </label>
            </div>
            <input
              type="submit"
              className="button action-button--scoring-submit"
              value="SUBMIT"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ScoringBreakdownComponent;

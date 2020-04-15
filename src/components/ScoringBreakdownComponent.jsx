import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from '../redux/actions/appActions';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const ScoringBreakdownComponent = () => {
  const dispatch = useDispatch();
  let score = useSelector((state) => state.scoring.score);

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
            <div className="score-popover__list-item">
              <div className="row">
                <div className="col">YOU ROCKED JUMP!!</div>
                <div className="col-auto">97-100</div>
              </div>
            </div>
            <div className="score-popover__list-item">
              <div className="row">
                <div className="col">HIGH GOLD</div>
                <div className="col-auto">92-96</div>
              </div>
            </div>
          </div>
          <div className="score-popover__list-item">
            <div className="row">
              <div className="col">GOLD</div>
              <div className="col-auto">87-91</div>
            </div>
          </div>
          <div className="score-popover__list-item">
            <div className="row">
              <div className="col">HIGH SILVER</div>
              <div className="col-auto">82-86</div>
            </div>
          </div>
          <div className="score-popover__list-item">
            <div className="row">
              <div className="col">SILVER</div>
              <div className="col-auto">77-81</div>
            </div>
          </div>
          <div className="score-popover__list-item">
            <div className="row">
              <div className="col">BRONZE</div>
              <div className="col-auto">72-76</div>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="scoring-breakdown__container">
      <div className="scoring-breakdown__title">SCORING BREAKDOWN</div>
      <OverlayTrigger trigger="click" placement="left" overlay={popover}>
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
        <textarea className="scoring-breakdown__textarea" />
        <div className="scoring-breakdown__checkbox">
          <input type="checkbox" id="family-friendly" name="family-friendly" />
          <label
            for="family-friendly"
            className="scoring-breakdown__checkbox--text"
          >
            {' '}
            Routine is not family-friendly
          </label>
        </div>
        <div className="scoring-breakdown__checkbox">
          <input type="checkbox" id="i_choreographed" name="i_choreographed" />
          <label
            for="i_choreographed"
            className="scoring-breakdown__checkbox--text"
          >
            {' '}
            I choreographed this routine
          </label>
        </div>
        <button type="button" className="button action-button--scoring-submit">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default ScoringBreakdownComponent;

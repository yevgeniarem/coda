import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getScoringBreakdown } from '../redux/actions/appActions';

export default function ScoringPopover() {
  const dispatch = useDispatch();
  const { scoring_breakdown } = useSelector((state) => state.scoring);
  const { id: eventId } = useSelector((state) => state.events.currentEvent);

  useEffect(() => {
    dispatch(getScoringBreakdown(eventId));
  }, [eventId, dispatch]);

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

  return (
    <OverlayTrigger
      trigger="click"
      placement="left"
      overlay={popover}
      rootClose
    >
      <FontAwesomeIcon
        icon={['fas', 'info-circle']}
        className="scoring-breakdown--info-icon"
      />
    </OverlayTrigger>
  );
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import NavbarScoring from '../componentsReusable/NavbarScoring';
import ScoringBreakdown from '../componentsReusable/ScoringBreakdown';
import {
  getRoutineList,
  makeButtonGreen,
  makeButtonRed,
  makeButtonGrey,
  getButtons,
} from '../redux/actions/appActions';
import {
  determineButtonColor,
  determineButtonType,
  splitButtonsIndex,
  splitButtonsIntoPages,
  isCompetitionOver,
} from '../utils/helpers';
import { allButtonsInfo, scoringPages } from '../utils/constants';

export default function Scoring() {
  const dispatch = useDispatch();
  const [
    inputs,
    { currentRoutine, allButtons },
    { buttons: reduxButtons },
  ] = useSelector((state) => [state.inputs, state.routines, state.scoring]);
  const [buttons, setButtons] = useState(null);
  const [splitIndex, setSplitIndex] = useState(null);

  useEffect(() => {
    Promise.all([dispatch(getRoutineList(inputs)), dispatch(getButtons())]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const currentLevelId = currentRoutine.performance_division_level_id;
    if (!currentLevelId) return;
    const buttonsToSet =
      allButtons &&
      allButtons.find((b) => b.level_id === currentLevelId).level_4;
    if (!buttonsToSet) return;
    setButtons(buttonsToSet);
    setSplitIndex(splitButtonsIndex(buttonsToSet));
    // eslint-disable-next-line
  }, [currentRoutine, allButtons]);

  const changeButtonColor = (button, buttonColor) => {
    switch (buttonColor) {
      case 'buttonIsGrey':
        dispatch(
          makeButtonGreen({
            level_4_id: button.id,
            level_1_id: button.level_1_id,
            good: true,
          }),
        );
        break;
      case 'buttonIsGreen':
        dispatch(
          makeButtonRed({
            level_4_id: button.id,
            level_1_id: button.level_1_id,
            good: false,
          }),
        );
        break;
      case 'buttonIsRed':
        dispatch(makeButtonGrey({ level_4_id: button.id }));
        break;
      default:
        break;
    }
  };

  const handleClick = (button) => {
    const buttonColor = determineButtonColor(button, reduxButtons);
    changeButtonColor(button, buttonColor);
  };

  return (
    <>
      <NavbarScoring />

      {scoringPages.map((sp) => (
        <div
          className={`button__container button__container--${sp.name}`}
          key={sp.name}
        >
          {buttons &&
            splitButtonsIntoPages(buttons, splitIndex, sp.buttons).map(
              (button) => {
                const buttonInfo = allButtonsInfo.find(
                  (b) => b.type === determineButtonType(button),
                );

                return (
                  <button
                    type="button"
                    key={button.id}
                    id={button.id}
                    // TODO figure out how to make the classes list more readable
                    className={classNames(
                      'button',
                      'button--judging',
                      buttonInfo.className,
                      button.header_level &&
                        `button--header-level-${button.header_level}`,
                      reduxButtons.map((b) => {
                        if (b.level_4_id !== button.id) return '';
                        if (b.good) return 'button--scoring--green';
                        return 'button--scoring--red';
                      }),
                    )}
                    onClick={
                      buttonInfo.clickable
                        ? (e) => handleClick(button, e)
                        : null
                    }
                  >
                    {button[buttonInfo.name]}
                  </button>
                );
              },
            )}
        </div>
      ))}

      <div>{!isCompetitionOver(currentRoutine) && <ScoringBreakdown />}</div>
    </>
  );
}

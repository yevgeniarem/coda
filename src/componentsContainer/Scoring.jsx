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
  determineButtonColorClassName,
  determineButtonHeaderLevel,
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
    (() => {
      const currentLevelId = currentRoutine.performance_division_level_id;
      if (!currentLevelId) return;
      const buttonsToSet =
        allButtons &&
        allButtons.find((b) => b.level_id === currentLevelId).level_4;
      if (!buttonsToSet) return;
      setButtons(buttonsToSet);
      setSplitIndex(splitButtonsIndex(buttonsToSet));
    })();
    // eslint-disable-next-line
  }, [currentRoutine, allButtons]);

  const changeButtonColor = (button, buttonColor) => {
    switch (buttonColor) {
      case 'buttonIsGrey':
        dispatch(makeButtonGreen(button));
        break;
      case 'buttonIsGreen':
        dispatch(makeButtonRed(button));
        break;
      case 'buttonIsRed':
        dispatch(makeButtonGrey(button));
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
                    className={classNames(
                      'button',
                      'button--judging',
                      buttonInfo.typeClassName,
                      determineButtonHeaderLevel(button),
                      determineButtonColorClassName(reduxButtons, button),
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

      <div>
        {!isCompetitionOver(currentRoutine.date_routine_id) && (
          <ScoringBreakdown />
        )}
      </div>
    </>
  );
}

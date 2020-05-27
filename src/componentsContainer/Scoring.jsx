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
} from '../redux/actions/appActions';
import {
  getButtons,
  determineButtonColor,
  determineButtonType,
  splitButtonsIndex,
  splitButtonsIntoPages,
  isCompetitionOver,
} from '../utils/helpers';
import { allButtonsInfo } from '../utils/constants';

export default function Scoring() {
  const dispatch = useDispatch();
  const [
    inputs,
    { currentRoutine },
    { buttons: reduxButtons },
  ] = useSelector((state) => [state.inputs, state.routines, state.scoring]);
  const [buttons, setButtons] = useState([]);
  const [splitIndex, setSplitIndex] = useState(null);
  const [classes, setClasses] = useState({ classes: '', buttonId: '' });

  useEffect(() => {
    dispatch(getRoutineList(inputs));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // TODO only get buttons on mount, put it in redux
    getButtons()
      .then((response) => {
        const currentLevelId = currentRoutine.performance_division_level_id;
        if (!currentLevelId) return;
        const buttonsToSet = response.data.find(
          (b) => b.level_id === currentLevelId,
        ).level_4;
        setButtons(buttonsToSet);
        setSplitIndex(splitButtonsIndex(buttonsToSet));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
    // eslint-disable-next-line
  }, [currentRoutine]);

  const changeButtonColor = (button, buttonColor) => {
    if (buttonColor === 'buttonIsGrey') {
      dispatch(
        makeButtonGreen({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: true,
        }),
      );
      setClasses({ classes: 'button--scoring--green', buttonId: button.id });
    }
    if (buttonColor === 'buttonIsGreen') {
      dispatch(
        makeButtonRed({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: false,
        }),
      );
      setClasses({ classes: 'button--scoring--red', buttonId: button.id });
    }
    if (buttonColor === 'buttonIsRed') {
      dispatch(makeButtonGrey({ level_4_id: button.id }));
      setClasses({ classes: '', buttonId: button.id });
    }
  };

  const handleClick = (button) => {
    const buttonColor = determineButtonColor(button, reduxButtons);
    changeButtonColor(button, buttonColor);
  };

  const scoringPages = [
    { name: 'firstPage', buttons: 'foundationButtons' },
    { name: 'secondPage', buttons: 'perfAndCreativeButtons' },
  ];

  return (
    <>
      <NavbarScoring />

      {scoringPages.map((sp) => (
        <div className={`button__container button__container--${sp.name}`}>
          {splitButtonsIntoPages(buttons, splitIndex, sp.buttons).map(
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
                    buttonInfo.className,
                    button.header_level &&
                      `button--header-level-${button.header_level}`,
                    button.id === classes.buttonId && classes.classes,
                  )}
                  onClick={
                    buttonInfo.clickable ? (e) => handleClick(button, e) : null
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

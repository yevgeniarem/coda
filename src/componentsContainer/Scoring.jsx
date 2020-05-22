import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import NavbarScoring from '../componentsReusable/NavbarScoring';
import ScoringBreakdown from '../componentsReusable/ScoringBreakdown';
import {
  getRoutineList,
  makeButtonGreen,
  makeButtonRed,
  deleteButton,
} from '../redux/actions/appActions';
import {
  getButtons,
  determineButtonColor,
  determineButtonType,
  splitButtonsIntoPages,
} from '../utils/helpers';

export default function Scoring() {
  const dispatch = useDispatch();
  const [
    inputs,
    { currentRoutine },
    { buttons: reduxButtons },
  ] = useSelector((state) => [state.inputs, state.routines, state.scoring]);
  const [buttons, setButtons] = useState([]);
  const [classes, setClasses] = useState({ classes: '', buttonId: '' });

  useEffect(() => {
    dispatch(getRoutineList(inputs));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getButtons()
      .then((response) => {
        const currentLevelId = currentRoutine.performance_division_level_id;
        if (!currentLevelId) return;
        setButtons(
          response.data.find((b) => b.level_id === currentLevelId).level_4,
        );
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
      dispatch(deleteButton({ level_4_id: button.id }));
      setClasses({ classes: '', buttonId: button.id });
    }
  };

  const handleClick = (button) => {
    const buttonColor = determineButtonColor(button, reduxButtons);
    changeButtonColor(button, buttonColor);
  };

  const allButtons = buttons.map((button) => {
    const allButtonsInfo = [
      {
        type: 'headerButton',
        name: button.header_name,
        className: `button--header-level-${button.header_level}`,
        clickable: false,
      },
      {
        type: 'level3Button',
        name: button.level_3_name,
        className: 'button--scoring',
        clickable: true,
      },
      {
        type: 'level4Button',
        name: button.level_4_name,
        className: 'button--scoring',
        clickable: true,
      },
    ];
    const buttonType = determineButtonType(button);
    const buttonInfo = allButtonsInfo.find((b) => b.type === buttonType);

    return (
      <button
        type="button"
        key={button.id}
        id={button.id}
        className={classNames(
          'button',
          'button--judging',
          buttonInfo.className,
          button.id === classes.buttonId ? classes.classes : '',
        )}
        onClick={buttonInfo.clickable ? (e) => handleClick(button, e) : null}
      >
        {buttonInfo.name}
      </button>
    );
  });

  const buttonPages = splitButtonsIntoPages(allButtons);

  return (
    <>
      <NavbarScoring />

      <div className="button__container button__container--firstPage">
        {buttonPages.foundationButtons}
      </div>

      <div className="button__container button__container--secondPage">
        {buttonPages.perfAndCreativeButtons}
      </div>

      <div>{currentRoutine.date_routine_id && <ScoringBreakdown />}</div>
    </>
  );
}

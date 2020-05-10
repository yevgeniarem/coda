import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavbarScoring from '../componentsReusable/NavbarScoring';
import ScoringBreakdown from '../componentsReusable/ScoringBreakdown';
import {
  getRoutineList,
  makeButtonGreen,
  makeButtonRed,
  deleteButton,
} from '../redux/actions/appActions';
import { getButtons } from '../utils/helpers';

export default function Scoring() {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const { currentRoutine } = useSelector((state) => state.routines);
  const { buttons: reduxButtons } = useSelector((state) => state.scoring);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    dispatch(getRoutineList(inputs));
    getButtons()
      .then((response) => {
        setButtons(
          response.data.find(
            (b) => b.level_id === currentRoutine.performance_division_level_id,
          ).level_4,
        );
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [inputs, dispatch, currentRoutine.performance_division_level_id]);

  const handleClick = (button) => {
    const selectedButton = document.getElementById(button.id);
    const buttonIsGrey = !reduxButtons.find(
      (reduxButton) => reduxButton.level_4_id === button.id,
    );
    const buttonIsGreen = reduxButtons.find(
      (reduxButton) =>
        reduxButton.level_4_id === button.id && reduxButton.good === true,
    );
    const buttonIsRed = reduxButtons.find(
      (reduxButton) =>
        reduxButton.level_4_id === button.id && reduxButton.good === false,
    );

    if (buttonIsGrey) {
      dispatch(
        makeButtonGreen({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: true,
        }),
      );
      selectedButton.classList.add('button--scoring--green');
    }
    if (buttonIsGreen) {
      dispatch(
        makeButtonRed({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: false,
        }),
      );
      selectedButton.classList.remove('button--scoring--green');
      selectedButton.classList.add('button--scoring--red');
    }
    if (buttonIsRed) {
      dispatch(deleteButton({ level_4_id: button.id }));
      selectedButton.classList.remove('button--scoring--red');
    }
  };

  const allButtons = buttons.map((button) => {
    if (button.header_level) {
      return (
        <button
          type="button"
          key={button.id}
          id={button.id}
          className={`button button--judging button--header-level-${button.header_level}`}
        >
          {button.header_name}
        </button>
      );
    }
    if (button.level_4_name === null && button.level_3_name) {
      return (
        <button
          type="button"
          key={button.id}
          id={button.id}
          className="button button--judging button--scoring"
          onClick={(e) => handleClick(button, e)}
        >
          {button.level_3_name}
        </button>
      );
    }
    if (button.level_4_name) {
      return (
        <button
          type="button"
          key={button.id}
          id={button.id}
          className="button button--judging button--scoring"
          onClick={() => handleClick(button)}
        >
          {button.level_4_name}
        </button>
      );
    }
    return null;
  });

  const performanceButton = allButtons.find(
    (button) => button.props.children === 'Performance',
  );
  const foundationButtons = allButtons.splice(
    0,
    allButtons.indexOf(performanceButton),
  );
  const perfAndCreativeButtons = allButtons;

  return (
    <>
      <NavbarScoring />
      <div className="button__container button__container--firstPage">
        {foundationButtons}
      </div>
      <div className="button__container button__container--secondPage">
        {perfAndCreativeButtons}
      </div>
      <div>{currentRoutine.routine_id && <ScoringBreakdown />}</div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import ScoringBreakdownComponent from './ScoringBreakdownComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateRoutineList,
  addButton,
  changeButton,
  deleteButton,
} from '../redux/actions/appActions';
import axios from 'axios';

const Judge5 = () => {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const { currentRoutine } = useSelector((state) => state.routines);
  const { buttons: reduxButtons } = useSelector((state) => state.scoring);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios // routines and scores of a position
      .get(`https://api.d360test.com/api/coda/routines`, {
        params: {
          tour_date_id: inputs.tourDateId,
          competition_group_id: inputs.competitionGroup,
          position: inputs.position,
        },
      })
      .then(function (response) {
        dispatch(updateRoutineList(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    axios // buttons
      .get('https://api.d360test.com/api/coda/buttons')
      .then(function (response) {
        setButtons(
          response.data.find(
            (buttons) =>
              buttons.level_id === currentRoutine.performance_division_level_id
          ).level_4
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [inputs, dispatch, currentRoutine.performance_division_level_id]);

  const handleClick = (button) => {
    let selectedButton = document.getElementById(button.id);

    if (
      !reduxButtons.find((reduxButton) => reduxButton.level_4_id === button.id)
    ) {
      dispatch(
        addButton({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: true,
        })
      );
      selectedButton.classList.add('button--scoring--green');
    }

    if (
      reduxButtons.find(
        (reduxButton) =>
          reduxButton.level_4_id === button.id && reduxButton.good === true
      )
    ) {
      dispatch(
        changeButton({
          level_4_id: button.id,
          level_1_id: button.level_1_id,
          good: false,
        })
      );
      selectedButton.classList.remove('button--scoring--green');
      selectedButton.classList.add('button--scoring--red');
    }
    if (
      reduxButtons.find(
        (reduxButton) =>
          reduxButton.level_4_id === button.id && reduxButton.good === false
      )
    ) {
      dispatch(deleteButton({ level_4_id: button.id }));
      selectedButton.classList.remove('button--scoring--red');
    }
  };

  let allButtons = buttons.map((button) => {
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
          className={`button button--judging button--scoring`}
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
          className={`button button--judging button--scoring`}
          onClick={() => handleClick(button)}
        >
          {button.level_4_name}
        </button>
      );
    }
  });

  let performanceButton = allButtons.find(
    (button) => button.props.children === 'Performance'
  );
  let foundationButtons = allButtons.splice(
    0,
    allButtons.indexOf(performanceButton)
  );
  let perfAndCreativeButtons = allButtons;

  const conditionalScoringBreakdownComp = () => {
    if (!!currentRoutine.routine_id) {
      return <ScoringBreakdownComponent />;
    }
  };

  return (
    <>
      <NavbarComponent type="scoreSheet" name="judge5" />
      <div className="button__container button__container--firstPage">
        {foundationButtons}
      </div>
      <div className="button__container button__container--secondPage">
        {perfAndCreativeButtons}
      </div>
      <div>{conditionalScoringBreakdownComp()}</div>
    </>
  );
};

export default Judge5;

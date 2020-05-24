import axios from 'axios';
import moment from 'moment';

import CONST from './constants';

export const getButtons = () => axios.get(`${CONST.API}/coda/buttons`);

export const formatTourDate = (t) => {
  let dates;
  if (
    moment.utc(t.startDate).format('MMM') ===
    moment.utc(t.endDate).format('MMM')
  ) {
    dates = `${moment.utc(t.startDate).format('MMM D')}-${moment
      .utc(t.endDate)
      .format('D, YYYY')}`;
  } else {
    dates = `${moment.utc(t.startDate).format('MMM D')}-${moment
      .utc(t.endDate)
      .format('MMM D, YYYY')}`;
  }
  return `${t.eventCity} - ${dates}`;
};

export const toCamelCase = (str) => {
  return str
    .split(' ')
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');
};

export const determineButtonColor = (button, reduxButtons) => {
  const reduxButton = reduxButtons.find((rb) => rb.level_4_id === button.id);
  if (!reduxButton) return 'buttonIsGrey';
  return reduxButton.good ? 'buttonIsGreen' : 'buttonIsRed';
};

export const determineButtonType = (button) => {
  if (button.header_level) return 'headerButton';
  if (button.level_4_name === null && button.level_3_name)
    return 'level3Button';
  return 'level4Button';
};

export const splitButtonsIntoPages = (allButtons) => {
  const firstPerformanceButton = allButtons.find(
    (b) => b.props.children === 'Performance',
  );
  const splitIndex = allButtons.indexOf(firstPerformanceButton);
  const foundationButtons = allButtons.slice(0, splitIndex);
  const perfAndCreativeButtons = allButtons.slice(splitIndex);
  return { foundationButtons, perfAndCreativeButtons };
};

export const isCompetitionOver = (currentRoutine) =>
  currentRoutine && !currentRoutine.date_routine_id;

export const isEven = (i) => i % 2 === 0;

export const filterButtonsById = (buttons, id) =>
  buttons && buttons.filter((b) => b.level_1_id === id);

export const calculateGoodBtnPercentage = (btn) => {
  const btns = (btn && btn.map((b) => b.good)) || [];
  const percentage =
    (btns.filter((isGood) => isGood === true).length / btns.length) * 100;
  if (Number.isNaN(percentage)) return 50;
  return Math.floor(percentage);
};

export const calculateStrongestCategory = (buttonPercentages) => {
  const max = Math.max(
    buttonPercentages.foundationButtons,
    buttonPercentages.performanceButtons,
    buttonPercentages.creativeButtons,
  );

  if (buttonPercentages.foundationPercentage === max) return 11;
  if (buttonPercentages.performanceButtons === max) return 12;
  if (buttonPercentages.creativeButtons === max) return 13;
  return null;
};

export const calculateWeakestCategory = (buttonPercentages) => {
  const min = Math.min(
    buttonPercentages.foundationButtons,
    buttonPercentages.performanceButtons,
    buttonPercentages.creativeButtons,
  );

  if (buttonPercentages.foundationPercentage === min) return 11;
  if (buttonPercentages.performanceButtons === min) return 12;
  if (buttonPercentages.creativeButtons === min) return 13;
  return null;
};

export const findNextAvailableRoutine = (routineList) =>
  routineList.find((r) => !r.canceled && !r.score && r.score !== 0) || {};

export const findJudgeNameById = (judgeList, judgeId) => {
  const index = judgeList.map((judge) => judge.id === judgeId).indexOf(true);
  const currentJudge = judgeList[index] || {};
  return currentJudge.judge.toUpperCase();
};

export const applyDefaultNote = (judgeList, currentJudge) => {
  const judgeObj = judgeList.find((judge) => judge.id === currentJudge);
  let finalNote = judgeObj.default_notes;
  if (!judgeObj.default_notes) finalNote = '';
  return finalNote;
};

export const findNextAvailableDate = (inputs) =>
  inputs &&
  inputs.find((i) => moment.utc(i.endDate).isSameOrAfter(moment.utc()));

export const renderRoutineNumber = (routine) =>
  routine.has_a ? `#${routine.number}a` : `#${routine.number}`;

import moment from 'moment';

export const getMonth = (date) => moment.utc(date).month();

export const formatTourDate = (t) => {
  const formatWithMonth = 'MMM D';
  const formatWithoutMonth = 'D';

  return `${t.eventCity} - ${moment
    .utc(t.startDate)
    .format(formatWithMonth)}-${moment
    .utc(t.endDate)
    .format(
      `${
        getMonth(t.startDate) === getMonth(t.endDate)
          ? formatWithoutMonth
          : formatWithMonth
      }, YYYY`,
    )}`;
};

export const toCamelCase = (str) =>
  str
    .split(' ')
    .map((word, index) =>
      !index
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('');

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

export const splitButtonsIndex = (buttons) => {
  const firstPerformanceButton = buttons.find(
    (b) => b.header_name === 'Performance',
  );
  return buttons.indexOf(firstPerformanceButton);
};

export const splitButtonsIntoPages = (buttons, splitIndex, type) => {
  const sliceProps = {
    foundationButtons: [0, splitIndex],
    perfAndCreativeButtons: [splitIndex],
  };
  return buttons.slice(...sliceProps[type]);
};

export const isCompetitionOver = (date_routine_id) => !date_routine_id;

export const isEven = (i) => i % 2 === 0;

export const filterButtonsByLevel = (buttons, id) =>
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
  const currentJudge = judgeList.find((judge) => judge.id === judgeId) || {};
  return currentJudge.judge.toUpperCase();
};

export const applyDefaultNote = (judgeList, currentJudge) =>
  judgeList.find((judge) => judge.id === currentJudge).default_notes || '';

export const findNextAvailableDate = (inputs) =>
  inputs &&
  inputs.find((i) => moment.utc(i.endDate).isSameOrAfter(moment.utc()));

export const renderRoutineNumber = (routine) =>
  `#${routine.number}${routine.has_a ? 'a' : ''}`;

export const determineButtonColorClassName = (reduxButtons, button) =>
  reduxButtons.map((b) => {
    if (b.level_4_id !== button.id) return '';
    return b.good ? 'button--scoring--green' : 'button--scoring--red';
  });

export const determineButtonHeaderLevel = (button) =>
  button.header_level && `button--header-level-${button.header_level}`;

export const isButtonDisabled = (location, inputs) =>
  location === 'judges' &&
  (!inputs.judge || !inputs.position || !inputs.teacherJudge);

export const initNavbarContent = ({
  number,
  routine,
  age_division,
  performance_division,
  routine_category,
  date_routine_id,
}) => ({
  title: isCompetitionOver(date_routine_id)
    ? 'COMPETITION IS OVER'
    : `#${number} - ${routine}`,
  subtitle:
    !isCompetitionOver(date_routine_id) &&
    `${age_division} • ${performance_division} • ${routine_category}`,
});

export const doesRoutineHaveScore = ({ score }) => !!score || score === 0;

export const filterOutButton = (buttons, payload) =>
  buttons.filter((b) => b.level_4_id !== payload.id);

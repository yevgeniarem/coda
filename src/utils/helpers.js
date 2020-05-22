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

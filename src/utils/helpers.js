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

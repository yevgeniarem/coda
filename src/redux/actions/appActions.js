import axios from 'axios';

import CONST from '../../utils/constants';

export const updateLogin = (e) => ({
  type: 'UPDATE_LOGIN',
  payload: e,
});

export const authLogin = () => ({
  type: 'AUTH_LOGIN',
});

export const invalidLogin = (payload) => ({
  type: 'INVALID_LOGIN',
  payload,
});

export const tryLogin = ({ name, password }) => async (dispatch) => {
  try {
    // console.log(getState().login);
    await axios.post(`${CONST.API}/auth/signin`, {
      name,
      password,
    });
    dispatch(authLogin());
  } catch (err) {
    dispatch(invalidLogin(true));
  }
};

export const createEvents = (payload) => ({
  type: 'CREATE_EVENTS',
  payload,
});

export const updateCurrentEvent = (payload) => ({
  type: 'UPDATE_CURRENT_EVENT',
  payload,
});

export const createEventCitiesList = (payload) => ({
  type: 'CREATE_EVENT_CITIES_LIST',
  payload,
});

export const updateInput = (variable, id) => ({
  type: 'UPDATE_INPUT',
  variable,
  id,
});

export const runJudgeModal = (payload) => ({
  type: 'RUN_JUDGE_MODAL',
  payload,
});

export const runRoutineModal = (payload) => ({
  type: 'RUN_ROUTINE_MODAL',
  payload,
});

export const updateJudgeList = (payload) => ({
  type: 'UPDATE_JUDGE_LIST',
  payload,
});

export const updateRoutineList = (payload) => ({
  type: 'UPDATE_ROUTINE_LIST',
  payload,
});

export const updateCurrentRoutine = (payload) => ({
  type: 'UPDATE_CURRENT_ROUTINE',
  payload,
});

export const updateScore = (payload) => ({
  type: 'UPDATE_SCORE',
  payload,
});

export const toggleSidebar = () => ({
  type: 'TOGGLE_SIDEBAR',
});

export const closeSidebar = () => ({
  type: 'CLOSE_SIDEBAR',
});

export const addButton = (payload) => ({
  type: 'ADD_BUTTON',
  payload,
});

export const changeButton = (payload) => ({
  type: 'CHANGE_BUTTON',
  payload,
});

export const deleteButton = (payload) => ({
  type: 'DELETE_BUTTON',
  payload,
});

export const runSubmitModal = (payload) => ({
  type: 'RUN_SUBMIT_MODAL',
  payload,
});

export const updateScoringBreakdown = (payload) => ({
  type: 'UPDATE_SCORING_BREAKDOWN',
  payload,
});

export const toggleNotFriendly = () => ({
  type: 'TOGGLE_NOT_FRIENDLY',
});

export const toggleIChoreographed = () => ({
  type: 'TOGGLE_I_CHOREOGRAPHED',
});

export const updateNote = (payload) => ({
  type: 'UPDATE_NOTE',
  payload,
});

export const resetScoring = () => ({
  type: 'RESET_SCORING',
});

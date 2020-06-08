import axios from 'axios';

import CONST from '../../utils/constants';
import { findNextAvailableRoutine, filterOutButton } from '../../utils/helpers';
import {
  Event,
  TourDate,
  Button,
  Modal,
  Judge,
  CompetitionGroup,
  Score,
} from '../../utils/models';

export const createEvents = (payload) => (dispatch) => {
  dispatch({
    type: 'CREATE_EVENTS',
    payload: payload.map((event) => new Event(event)),
  });
};

export const updateCurrentEvent = (payload) => (dispatch, getState) => {
  const { events } = getState().events;
  dispatch({
    type: 'UPDATE_CURRENT_EVENT',
    payload: events.find((e) => e.id === payload),
  });
};

export const updateTourDates = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_TOUR_DATES',
    payload: payload.map((tourDate) => new TourDate(tourDate)),
  });
};

export const updateInput = (payload) => (dispatch) => {
  dispatch({ type: 'UPDATE_INPUT', payload });
};

export const updateJudgeList = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_JUDGE_LIST',
    payload,
  });
};

export const updateCompetitionGroupList = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_COMPETITION_GROUP_LIST',
    payload,
  });
};

export const updateLogin = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_LOGIN',
    payload,
  });
};

export const authLogin = () => (dispatch) => {
  dispatch({
    type: 'AUTH_LOGIN',
    payload: true,
  });
};

// TODO make another action for closing the modal
export const runModal = ({ isModalShown, modalInfo }) => (dispatch) => {
  dispatch({
    type: 'RUN_MODAL',
    isModalShown,
    modalInfo,
  });
};

export const closeSidebar = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_SIDEBAR',
    payload: false,
  });
};

export const getButtons = () => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/buttons`);
    await dispatch({ type: 'GET_BUTTONS', payload: response.data });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const updateRoutineList = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_ROUTINE_LIST',
    payload,
  });
};

export const updateCurrentRoutine = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CURRENT_ROUTINE',
    payload,
  });
};

export const updateScore = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_SCORE',
    payload,
  });
};

export const makeButtonGreen = (payload) => (dispatch, getState) => {
  const { buttons } = getState().scoring;
  dispatch({
    type: 'MAKE_BUTTON_GREEN',
    payload: [...buttons, new Button({ ...payload, good: true })],
  });
};

export const makeButtonRed = (payload) => (dispatch, getState) => {
  const { buttons } = getState().scoring;
  dispatch({
    type: 'MAKE_BUTTON_RED',
    payload: [
      ...filterOutButton(buttons, payload),
      new Button({ ...payload, good: false }),
    ],
  });
};

export const makeButtonGrey = (payload) => (dispatch, getState) => {
  const { buttons } = getState().scoring;
  dispatch({
    type: 'MAKE_BUTTON_GREY',
    payload: filterOutButton(buttons, payload),
  });
};

export const updateScoringBreakdown = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_SCORING_BREAKDOWN',
    payload,
  });
};

export const toggleNotFriendly = () => (dispatch, getState) => {
  const { not_friendly } = getState().scoring;
  dispatch({
    type: 'TOGGLE_NOT_FRIENDLY',
    payload: !not_friendly,
  });
};

export const toggleIChoreographed = () => (dispatch, getState) => {
  const { i_choreographed } = getState().scoring;
  dispatch({
    type: 'TOGGLE_I_CHOREOGRAPHED',
    payload: !i_choreographed,
  });
};

export const updateNote = (payload) => (dispatch) => {
  dispatch({
    type: 'UPDATE_NOTE',
    payload,
  });
};

export const resetScoring = () => (dispatch, getState) => {
  const { scoring_breakdown } = getState().scoring;
  dispatch({
    type: 'RESET_SCORING',
    payload: scoring_breakdown,
  });
};

export const toggleSidebar = () => (dispatch, getState) => {
  const state = getState().sidebar;
  dispatch({
    type: 'TOGGLE_SIDEBAR',
    payload: !state,
  });
};

export const tryLogin = ({ name, password }) => async (dispatch) => {
  try {
    await axios.post(`${CONST.API}/auth/signin`, {
      name,
      password,
    });
    await dispatch(authLogin());
  } catch (err) {
    dispatch(
      runModal(
        new Modal({
          isModalShown: true,
          modalInfo: {
            title: 'Sorry',
            body: 'You have entered an invalid username or password.',
            button2: 'OK',
          },
        }),
      ),
    );
  }
};

export const tryModalJudgeCheck = ({ tourDateId, position }) => async () => {
  try {
    const response = await axios.get(`${CONST.API}/coda/check-judge`, {
      params: {
        tour_date_id: tourDateId,
        competition_group_id: 2,
        position,
      },
    });
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
};

export const getEventsList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/events`);
    await dispatch(createEvents(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getJudgeList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/judges`);
    await dispatch(
      updateJudgeList(response.data.map((judge) => new Judge(judge))),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getCompetitionGroupList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/competition-groups`);
    await dispatch(
      updateCompetitionGroupList(
        response.data.map(
          (competitionGroup) => new CompetitionGroup(competitionGroup),
        ),
      ),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getRoutineList = ({
  tourDateId,
  competitionGroup,
  position,
}) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/routines`, {
      params: {
        tour_date_id: tourDateId,
        competition_group_id: competitionGroup,
        position,
      },
    });
    await dispatch(updateRoutineList(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getTourDates = ({ id, seasonId }) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/tour-dates`, {
      params: {
        event_id: id,
        season_id: seasonId,
      },
    });
    await dispatch(updateTourDates(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const postScore = (score) => async (dispatch) => {
  try {
    await axios.post(`${CONST.API}/coda/score`, new Score(score));
    await axios.post(`${CONST.API}/socket-scoring`, {
      tour_date_id: score.tourDateId,
      coda: true,
      data: {
        competition_group_id: score.competitionGroup,
        date_routine_id: score.currentRoutine.date_routine_id,
      },
    });
    const routineIndex = score.routineList.findIndex(
      (routine) => routine.routine_id === score.currentRoutine.routine_id,
    );
    const newRoutineArr = score.routineList.slice(routineIndex + 1);
    const newCurrentRoutine = findNextAvailableRoutine(newRoutineArr);
    await dispatch(updateCurrentRoutine(newCurrentRoutine));
    window.scrollTo(0, 0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getScoringBreakdown = (eventId) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/scoring-breakdown`, {
      params: {
        event_id: eventId,
      },
    });
    await dispatch(updateScoringBreakdown(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

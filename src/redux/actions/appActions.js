import axios from 'axios';

import CONST from '../../utils/constants';

export const createEvents = (payload) => (dispatch) => {
  const events = [];
  payload.forEach((event) =>
    events.push({
      id: event.id,
      name: event.name,
      seasonId: event.current_season_id,
    }),
  );
  dispatch({
    type: 'CREATE_EVENTS',
    payload: events,
  });
};

export const updateCurrentEvent = (payload) => (dispatch, getState) => {
  const { events } = getState().events;
  const currentEvent = events.filter((e) => e.id === payload);
  dispatch({
    type: 'UPDATE_CURRENT_EVENT',
    payload: currentEvent[0],
  });
};

export const updateTourDates = (payload) => (dispatch) => {
  const tourDates = [];
  payload.forEach((city) => {
    tourDates.push({
      id: city.id,
      eventCity: city.event_city.name,
      startDate: city.start_date,
      endDate: city.end_date,
    });
  });
  dispatch({ type: 'UPDATE_TOUR_DATES', payload: tourDates });
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

export const invalidLogin = (payload) => (dispatch) => {
  dispatch({
    type: 'INVALID_LOGIN',
    payload,
  });
};

export const runJudgeModal = (payload) => (dispatch) => {
  dispatch({
    type: 'RUN_JUDGE_MODAL',
    payload,
  });
};

export const runRoutineModal = (payload) => (dispatch) => {
  dispatch({
    type: 'RUN_ROUTINE_MODAL',
    payload,
  });
};

export const runSubmitModal = (payload) => (dispatch) => {
  dispatch({
    type: 'RUN_SUBMIT_MODAL',
    payload,
  });
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
    payload: [...buttons, payload],
  });
};

export const makeButtonRed = (payload) => (dispatch, getState) => {
  const { buttons } = getState().scoring;
  const filteredButtons = buttons.filter(
    (button) => button.level_4_id !== payload.level_4_id,
  );
  dispatch({
    type: 'MAKE_BUTTON_RED',
    payload: [...filteredButtons, payload],
  });
};

export const deleteButton = (payload) => (dispatch, getState) => {
  const { buttons } = getState().scoring;
  const filteredButtons = buttons.filter(
    (button) => button.level_4_id !== payload.level_4_id,
  );
  dispatch({ type: 'DELETE_BUTTON', payload: filteredButtons });
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

export const closeSidebar = () => (dispatch) => {
  dispatch({
    type: 'CLOSE_SIDEBAR',
    payload: false,
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
    dispatch(invalidLogin(true));
  }
};

export const tryJudgeCheck = ({ tourDateId, position }) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/check-judge`, {
      params: {
        tour_date_id: tourDateId,
        competition_group_id: 2,
        position,
      },
    });
    await dispatch(runJudgeModal(response.data));
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
      updateJudgeList(
        response.data.map((judge) => ({
          judge: `${judge.fname} ${judge.lname}`,
          id: judge.id,
          default_notes: judge.default_notes,
        })),
      ),
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
        response.data.map((group) => ({
          competitionGroup: group.name,
          id: group.id,
        })),
      ),
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getRoutineList = (inputs) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/routines`, {
      params: {
        tour_date_id: inputs.tourDateId,
        competition_group_id: inputs.competitionGroup,
        position: inputs.position,
      },
    });
    await dispatch(updateRoutineList(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getTourDates = (currentEvent) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/tour-dates`, {
      params: {
        event_id: currentEvent.id,
        season_id: currentEvent.seasonId,
      },
    });
    await dispatch(updateTourDates(response.data));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const postScore = ({
  competitionGroup,
  currentRoutine,
  currentEvent,
  tourDateId,
  currentJudge,
  finalNote,
  score,
  not_friendly,
  i_choreographed,
  position,
  teacherJudge,
  is_coda,
  buttons,
  strongest_level_1_id,
  weakest_level_1_id,
  routineList,
}) => async (dispatch) => {
  try {
    await axios.post(`${CONST.API}/coda/score`, {
      isTabulator: false,
      competition_group_id: competitionGroup,
      date_routine_id: currentRoutine.date_routine_id,
      event_id: currentEvent.id,
      tour_date_id: tourDateId,
      data: {
        online_scoring_id: currentRoutine.online_scoring_id,
        staff_id: currentJudge,
        note: finalNote,
        score,
        not_friendly,
        i_choreographed,
        position,
        teacher_critique: teacherJudge,
        is_coda,
        buttons,
        strongest_level_1_id,
        weakest_level_1_id,
      },
    });
    await axios.post(`${CONST.API}/socket-scoring`, {
      tour_date_id: tourDateId,
      coda: true,
      data: {
        competition_group_id: competitionGroup,
        date_routine_id: currentRoutine.date_routine_id,
      },
    });
    const routineIndex = routineList.findIndex(
      (routine) => routine.routine_id === currentRoutine.routine_id,
    );
    const newRoutineArr = routineList.slice(routineIndex + 1);
    const newCurrentRoutine = newRoutineArr.find(
      (routine) => !routine.canceled && !routine.score && routine.score !== 0,
    );
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

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

export const runJudgeModal = (payload) => ({
  type: 'RUN_JUDGE_MODAL',
  payload,
});

export const createEvents = (payload) => ({
  type: 'CREATE_EVENTS',
  payload,
});

export const updateJudgeList = (payload) => ({
  type: 'UPDATE_JUDGE_LIST',
  payload,
});

export const updateCompetitionGroupList = (payload) => ({
  type: 'UPDATE_COMPETITION_GROUP_LIST',
  payload,
});

export const updateInput = (variable, id) => ({
  type: 'UPDATE_INPUT',
  variable,
  id,
});

export const updateRoutineList = (payload) => ({
  type: 'UPDATE_ROUTINE_LIST',
  payload,
});

export const updateTourDates = (payload) => ({
  type: 'UPDATE_TOUR_DATES',
  payload,
});

export const updateCurrentRoutine = (payload) => ({
  type: 'UPDATE_CURRENT_ROUTINE',
  payload,
});

export const updateScoringBreakdown = (payload) => ({
  type: 'UPDATE_SCORING_BREAKDOWN',
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

export const tryJudgeCheck = ({ tourDateId, position }) => async (dispatch) => {
  try {
    const response = await axios.get(`${CONST.API}/coda/check-judge`, {
      params: {
        tour_date_id: tourDateId,
        competition_group_id: 2,
        position,
      },
    });
    dispatch(runJudgeModal(response.data));
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return null;
  }
};

export const getEventsList = () => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/events`)
    .then((response) => {
      dispatch(createEvents(response.data));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};

export const getJudgeList = () => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/judges`)
    .then((response) => {
      dispatch(
        updateJudgeList(
          response.data.map((judge) => ({
            judge: `${judge.fname} ${judge.lname}`,
            id: judge.id,
            default_notes: judge.default_notes,
          })),
        ),
      );
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

export const getCompetitionGroupList = () => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/competition-groups`)
    .then((groups) => {
      dispatch(
        updateCompetitionGroupList(
          groups.data.map((group) => ({
            competitionGroup: group.name,
            id: group.id,
          })),
        ),
      );
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

export const getRoutineList = (inputs) => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/routines`, {
      params: {
        tour_date_id: inputs.tourDateId,
        competition_group_id: inputs.competitionGroup,
        position: inputs.position,
      },
    })
    .then((response) => {
      dispatch(updateRoutineList(response.data));
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

export const getTourDates = (currentEvent) => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/tour-dates`, {
      params: {
        event_id: currentEvent.id,
        season_id: currentEvent.seasonId,
      },
    })
    .then((response) => {
      dispatch(updateTourDates(response.data));
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
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
    dispatch(updateCurrentRoutine(newCurrentRoutine));
    window.scrollTo(0, 0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

export const getScoringBreakdown = (eventId) => (dispatch) => {
  axios
    .get(`${CONST.API}/coda/scoring-breakdown`, {
      params: {
        event_id: eventId,
      },
    })
    .then((response) => {
      dispatch(updateScoringBreakdown(response.data));
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
};

export const updateCurrentEvent = (payload) => ({
  type: 'UPDATE_CURRENT_EVENT',
  payload,
});

export const runRoutineModal = (payload) => ({
  type: 'RUN_ROUTINE_MODAL',
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

export const makeButtonGreen = (payload) => ({
  type: 'MAKE_BUTTON_GREEN',
  payload,
});

export const makeButtonRed = (payload) => ({
  type: 'MAKE_BUTTON_RED',
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

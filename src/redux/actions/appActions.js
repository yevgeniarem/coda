export const updateLogin = (e) => {
  return {
    type: 'UPDATE_LOGIN',
    payload: e,
  };
};

export const authLogin = () => {
  return {
    type: 'AUTH_LOGIN',
  };
};

export const invalidLogin = (payload) => {
  return {
    type: 'INVALID_LOGIN',
    payload,
  };
};

export const createEvents = (payload) => {
  return {
    type: 'CREATE_EVENTS',
    payload,
  };
};

export const updateCurrentEvent = (payload) => {
  return {
    type: 'UPDATE_CURRENT_EVENT',
    payload,
  };
};

export const createEventCitiesList = (payload) => {
  return {
    type: 'CREATE_EVENT_CITIES_LIST',
    payload,
  };
};

export const updateInput = (variable, id) => {
  return {
    type: 'UPDATE_INPUT',
    variable,
    id,
  };
};

export const runJudgeModal = (payload) => {
  return {
    type: 'RUN_JUDGE_MODAL',
    payload,
  };
};

export const runRoutineModal = (payload) => {
  return {
    type: 'RUN_ROUTINE_MODAL',
    payload,
  };
};

export const updateJudgeList = (payload) => {
  return {
    type: 'UPDATE_JUDGE_LIST',
    payload,
  };
};

export const updateRoutineList = (payload) => {
  return {
    type: 'UPDATE_ROUTINE_LIST',
    payload,
  };
};

export const updateCurrentRoutine = (payload) => {
  return {
    type: 'UPDATE_CURRENT_ROUTINE',
    payload,
  };
};

export const updateScore = (payload) => {
  return {
    type: 'UPDATE_SCORE',
    payload,
  };
};

export const toggleSidebar = () => {
  return {
    type: 'TOGGLE_SIDEBAR',
  };
};

export const closeSidebar = () => {
  return {
    type: 'CLOSE_SIDEBAR',
  };
};

export const addButton = (payload) => {
  return {
    type: 'ADD_BUTTON',
    payload,
  };
};

export const changeButton = (payload) => {
  return {
    type: 'CHANGE_BUTTON',
    payload,
  };
};

export const deleteButton = (payload) => {
  return {
    type: 'DELETE_BUTTON',
    payload,
  };
};

export const runSubmitModal = (payload) => {
  return {
    type: 'RUN_SUBMIT_MODAL',
    payload,
  };
};

export const updateScoringBreakdown = (payload) => {
  return {
    type: 'UPDATE_SCORING_BREAKDOWN',
    payload,
  };
};

export const toggleNotFriendly = () => {
  return {
    type: 'TOGGLE_NOT_FRIENDLY',
  };
};

export const toggleIChoreographed = () => {
  return {
    type: 'TOGGLE_I_CHOREOGRAPHED',
  };
};

export const updateNote = (payload) => {
  return {
    type: 'UPDATE_NOTE',
    payload,
  };
};

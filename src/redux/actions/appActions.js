export const updateLogin = e => {
  return {
    type: 'UPDATE_LOGIN',
    payload: e
  };
};

export const authLogin = () => {
  return {
    type: 'AUTH_LOGIN'
  };
};

export const invalidLogin = () => {
  return {
    type: 'INVALID_LOGIN'
  };
};

export const handleModalClose = () => {
  return {
    type: 'HANDLE_MODAL_CLOSE'
  };
};

export const createEvents = payload => {
  return {
    type: 'CREATE_EVENTS',
    payload
  };
};

export const updateCurrentEvent = payload => {
  return {
    type: 'UPDATE_CURRENT_EVENT',
    payload
  };
};

export const createEventCitiesList = payload => {
  return {
    type: 'CREATE_EVENT_CITIES_LIST',
    payload
  };
};

export const updateInput = (variable, id, name) => {
  return {
    type: 'UPDATE_INPUT',
    variable,
    id,
    name
  };
};

export const runModal = payload => {
  return {
    type: 'RUN_MODAL',
    payload
  };
};

export const updateJudgeList = payload => {
  return {
    type: 'UPDATE_JUDGE_LIST',
    payload
  };
};

export const updateRoutineList = payload => {
  return {
    type: 'UPDATE_ROUTINE_LIST',
    payload
  };
};

export const updateCurrentRoutine = payload => {
  return {
    type: 'UPDATE_CURRENT_ROUTINE',
    payload
  };
};

export const updateScore = payload => {
  return {
    type: 'UPDATE_SCORE',
    payload
  };
};

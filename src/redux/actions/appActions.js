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

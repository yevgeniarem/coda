const initialState = {
  judgeName: ''
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case 'RUN_MODAL':
      return {
        ...state,
        judgeName: action.payload
      };
    default:
      return state;
  }
};

export default modals;

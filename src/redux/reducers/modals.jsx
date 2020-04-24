const initialState = {
  judgeName: '',
  isRoutineModalShown: false,
  isSubmitModalShown: false,
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case 'RUN_JUDGE_MODAL':
      return {
        ...state,
        judgeName: action.payload,
      };
    case 'RUN_ROUTINE_MODAL':
      return {
        ...state,
        isRoutineModalShown: action.payload,
      };
    case 'RUN_SUBMIT_MODAL':
      return {
        ...state,
        isSubmitModalShown: action.payload,
      };
    default:
      return state;
  }
};

export default modals;

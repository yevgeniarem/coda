const initialState = {
  routineList: null,
  currentRoutine: {},
  allButtons: null,
};

const routines = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BUTTONS':
      return { ...state, allButtons: action.payload };
    case 'UPDATE_ROUTINE_LIST':
      return {
        ...state,
        routineList: action.payload,
      };
    case 'UPDATE_CURRENT_ROUTINE':
      return {
        ...state,
        currentRoutine: action.payload,
      };
    default:
      return state;
  }
};

export default routines;

const initialState = {
  routineList: null,
  currentRoutine: {},
};

const routines = (state = initialState, action) => {
  switch (action.type) {
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

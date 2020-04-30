const initialState = {
  note: '',
  score: 100,
  not_friendly: false,
  i_choreographed: false,
  teacher_critique: false,
  is_coda: true, // hardcoded to always true
  buttons: [],
  scoring_breakdown: [],
};

const scoring = (state = initialState, action) => {
  let filteredButtons;
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload };
    case 'ADD_BUTTON':
      return { ...state, buttons: [...state.buttons, action.payload] };
    case 'CHANGE_BUTTON':
      filteredButtons = state.buttons.filter(
        (button) => button.level_4_id !== action.payload.level_4_id,
      );
      return { ...state, buttons: [...filteredButtons, action.payload] };
    case 'DELETE_BUTTON':
      filteredButtons = state.buttons.filter(
        (button) => button.level_4_id !== action.payload.level_4_id,
      );
      return { ...state, buttons: filteredButtons };
    case 'UPDATE_SCORING_BREAKDOWN':
      return { ...state, scoring_breakdown: action.payload };
    case 'TOGGLE_NOT_FRIENDLY':
      return { ...state, not_friendly: !state.not_friendly };
    case 'TOGGLE_I_CHOREOGRAPHED':
      return { ...state, i_choreographed: !state.i_choreographed };
    case 'UPDATE_NOTE':
      return { ...state, note: action.payload };
    case 'RESET_SCORING':
      return { ...initialState };
    default:
      return state;
  }
};

export default scoring;

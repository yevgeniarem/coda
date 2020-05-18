const initialState = {
  note: '',
  score: 100,
  not_friendly: false,
  i_choreographed: false,
  teacher_critique: false,
  is_coda: true, // hardcoded to always true
  buttons: [],
  scoring_breakdown: null,
};

const scoring = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload };
    case 'MAKE_BUTTON_GREEN':
      return { ...state, buttons: action.payload };
    case 'MAKE_BUTTON_RED':
      return { ...state, buttons: action.payload };
    case 'DELETE_BUTTON':
      return { ...state, buttons: action.payload };
    case 'UPDATE_SCORING_BREAKDOWN':
      return { ...state, scoring_breakdown: action.payload };
    case 'TOGGLE_NOT_FRIENDLY':
      return { ...state, not_friendly: action.payload };
    case 'TOGGLE_I_CHOREOGRAPHED':
      return { ...state, i_choreographed: action.payload };
    case 'UPDATE_NOTE':
      return { ...state, note: action.payload };
    case 'RESET_SCORING':
      return { ...initialState, scoring_breakdown: action.payload };
    default:
      return state;
  }
};

export default scoring;

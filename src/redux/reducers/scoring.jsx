const initialState = {
  note: '',
  score: 100,
  not_friendly: false,
  i_choreographed: false,
  teacher_critique: false,
  is_coda: true, //hardcoded to always true
  buttons: [],
  strongest_level_1_id: 0,
  weakest_level_1_id: 0,
  scoring_breakdown: [],
};

const scoring = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload };
    case 'ADD_BUTTON':
      return { ...state, buttons: [...state.buttons, action.payload] };
    case 'CHANGE_BUTTON':
      let filteredButtons = state.buttons.filter(
        (button) => button.level_4_id !== action.payload.level_4_id
      );
      return { ...state, buttons: [...filteredButtons, action.payload] };
    case 'DELETE_BUTTON':
      let newFilteredButtons = state.buttons.filter(
        (button) => button.level_4_id !== action.payload.level_4_id
      );
      return { ...state, buttons: newFilteredButtons };
    case 'UPDATE_SCORING_BREAKDOWN':
      return { ...state, scoring_breakdown: action.payload };
    case 'TOGGLE_NOT_FRIENDLY':
      return { ...state, not_friendly: !state.not_friendly };
    case 'TOGGLE_I_CHOREOGRAPHED':
      return { ...state, i_choreographed: !state.i_choreographed };
    case 'UPDATE_NOTE':
      return { ...state, note: action.payload };

    default:
      return state;
  }
};

export default scoring;

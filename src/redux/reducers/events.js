const initialState = {
  events: null,
  currentEvent: null,
  tourDates: null,
  currentTourDate: null,
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENTS':
      return { ...state, events: [...action.payload] };
    case 'UPDATE_CURRENT_EVENT':
      return { ...state, currentEvent: action.payload };
    case 'UPDATE_TOUR_DATES':
      return { ...state, tourDates: [...action.payload] };
    default:
      return state;
  }
};

export default events;

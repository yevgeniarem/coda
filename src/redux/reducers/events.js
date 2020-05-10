const initialState = {
  events: [],
  currentEvent: '',
  tourDates: [],
  currentTourDate: '',
};

const events = (state = initialState, action) => {
  const eventsList = [];
  let currentEvent = [];
  const tourDates = [];

  switch (action.type) {
    case 'CREATE_EVENTS':
      action.payload.forEach((event) => {
        eventsList.push({
          id: event.id,
          name: event.name,
          seasonId: event.current_season_id,
        });
      });
      return { ...state, events: [...eventsList] };
    case 'UPDATE_CURRENT_EVENT':
      currentEvent = state.events.filter(
        (event) => event.id === action.payload,
      );
      return { ...state, currentEvent: currentEvent[0] };
    case 'UPDATE_TOUR_DATES':
      action.payload.forEach((city) => {
        tourDates.push({
          id: city.id,
          eventCity: city.event_city.name,
          startDate: city.start_date,
          endDate: city.end_date,
        });
      });
      return { ...state, tourDates: [...tourDates] };
    default:
      return state;
  }
};

export default events;

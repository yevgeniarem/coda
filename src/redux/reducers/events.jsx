const initialState = {
  events: [],
  currentEvent: '',
  eventCitiesList: [],
  currentTourDate: '',
};

const events = (state = initialState, action) => {
  const eventsList = [];
  let currentEvent = [];
  const eventCitiesList = [];

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
    case 'CREATE_EVENT_CITIES_LIST':
      action.payload.forEach((city) => {
        eventCitiesList.push({
          id: city.id,
          eventCity: city.event_city.name,
          startDate: city.start_date,
          endDate: city.end_date,
        });
      });
      return { ...state, eventCitiesList: [...eventCitiesList] };
    default:
      return state;
  }
};

export default events;

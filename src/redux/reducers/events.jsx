const initialState = {
  events: [],
  currentEvent: '',
  eventCitiesList: [],
  currentTourDate: ''
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENTS':
      let events = [];
      action.payload.forEach(event => {
        events.push({
          id: event.id,
          name: event.name,
          seasonId: event.current_season_id
        });
      });
      return { ...state, events: [...events] };
    case 'UPDATE_CURRENT_EVENT':
      const currentEvent = state.events.filter(
        event => event.id === action.payload
      );
      return { ...state, currentEvent: currentEvent[0] };
    case 'CREATE_EVENT_CITIES_LIST':
      const eventCitiesList = [];
      action.payload.forEach(city => {
        eventCitiesList.push({
          id: city.id,
          eventCity: city.event_city.name,
          startDate: city.start_date,
          endDate: city.end_date
        });
      });
      return { ...state, eventCitiesList: [...eventCitiesList] };
    default:
      return state;
  }
};

export default events;

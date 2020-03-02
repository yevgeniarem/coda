const initialState = {
  events: [],
  currentEvent: '',
  eventID: 0,
  seasonID: 0
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENTS':
      let events = [];
      action.payload.forEach(event => {
        events.push({
          id: event.id,
          name: event.name
        });
      });
      return { ...state, events: [...events] };
    case 'UPDATE_CURRENT_EVENT':
      console.log(action.payload);
      return { ...state, currentEvent: 'payload' };
    default:
      return state;
  }
};

export default events;

const initialState = [];

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_EVENTS':
      const events = [];

      action.payload.forEach(event => {
        events.push({
          id: event.id,
          name: event.name
        });
      });
      return [...state, ...events];
    default:
      return state;
  }
};

export default events;

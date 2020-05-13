const sidebar = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return action.payload;
    case 'CLOSE_SIDEBAR':
      return action.payload;
    default:
      return state;
  }
};

export default sidebar;

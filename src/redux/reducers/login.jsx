const initialState = {
  name: '',
  password: ''
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return {
        ...state,
        [action.payload.type]: action.payload.value
      };
    default:
      return state;
  }
};

export default login;

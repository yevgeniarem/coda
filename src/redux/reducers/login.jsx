const initialState = {
  name: '',
  password: '',
  isLoggedIn: false,
  isInvalid: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN':
      return {
        ...state,
        [action.payload.type]: action.payload.value,
      };
    case 'AUTH_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'INVALID_LOGIN':
      return {
        ...state,
        isInvalid: action.payload,
      };
    default:
      return state;
  }
};

export default login;

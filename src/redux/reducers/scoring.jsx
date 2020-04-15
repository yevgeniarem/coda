const initialState = {
  score: 100
};

const scoring = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload };
    default:
      return state;
  }
};

export default scoring;

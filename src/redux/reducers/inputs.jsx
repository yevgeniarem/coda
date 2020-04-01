const initialState = {
  tourDateId: '',
  judge: 'default',
  position: 'default',
  teacherJudge: 'default',
  competitionGroup: 2
};

const inputs = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        [action.variable]: action.id
      };
    default:
      return state;
  }
};

export default inputs;

const initialState = {
  tourDateId: '',
  judge: 'default',
  position: 'default',
  teacherJudge: 'default',
  competitionGroup: 2,
  judgeList: [],
};

const inputs = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        [action.variable]: action.id,
      };
    case 'UPDATE_JUDGE_LIST':
      return {
        ...state,
        judgeList: action.payload,
      };
    default:
      return state;
  }
};

export default inputs;

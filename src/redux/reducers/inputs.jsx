const initialState = {
  tourDateId: 2187, //''
  judge: 50, //'default'
  position: 1, //'default'
  teacherJudge: true, //'default'
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

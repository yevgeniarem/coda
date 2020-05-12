const initialState = {
  tourDateId: '',
  judge: 'default',
  position: 'default',
  teacherJudge: 'default',
  competitionGroup: 2,
  judgeList: [],
  competitionGroupList: [],
};

const inputs = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return {
        ...state,
        [action.payload.variable]: action.payload.id,
      };
    case 'UPDATE_JUDGE_LIST':
      return {
        ...state,
        judgeList: action.payload,
      };
    case 'UPDATE_COMPETITION_GROUP_LIST':
      return {
        ...state,
        competitionGroupList: action.payload,
      };
    default:
      return state;
  }
};

export default inputs;

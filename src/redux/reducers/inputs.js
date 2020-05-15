const initialState = {
  tourDateId: null,
  judge: null,
  position: null,
  teacherJudge: null,
  competitionGroup: 2,
  judgeList: null,
  competitionGroupList: null,
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

const initialState = {
  judgeName: null,
  isLoginModalShown: false,
  isSidebarModalShown: false,
  isScoringBreakdownModalShown: false,
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case 'RUN_LOGIN_MODAL':
      return {
        ...state,
        isLoginModalShown: action.payload,
      };
    case 'RUN_JUDGE_MODAL':
      return {
        ...state,
        judgeName: action.payload,
      };
    case 'RUN_SIDEBAR_MODAL':
      return {
        ...state,
        isSidebarModalShown: action.payload,
      };
    case 'RUN_SCORING_BREAKDOWN_MODAL':
      return {
        ...state,
        isScoringBreakdownModalShown: action.payload,
      };
    default:
      return state;
  }
};

export default modals;

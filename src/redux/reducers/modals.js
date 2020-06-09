const initialState = {
  isModalShown: false,
  modalInfo: null,
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case 'RUN_MODAL':
      return {
        ...state,
        isModalShown: action.isModalShown,
        modalInfo: action.modalInfo,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalShown: false,
      };
    default:
      return state;
  }
};

export default modals;

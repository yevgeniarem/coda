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
    default:
      return state;
  }
};

export default modals;

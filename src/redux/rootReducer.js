const initialState = {
  canvasContent: []
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SUBMIT':
      return {
        ...state,
        canvasContent: state.canvasContent.concat(action.payload)
      };

    case 'UNDO':
      if (state.canvasContent.length === 0) {
        console.warn('cannot undo, no history!');
        return state;
      }
      const lastContent = state.canvasContent[state.canvasContent.length - 1];
      return {
        ...state,
        canvasContent: state.canvasContent.filter(item => item !== lastContent)
      };

    default:
      return state;
  }
}

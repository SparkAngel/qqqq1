
const initialState = {
  inputValue: '',
  show: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_NAME':
      return {
        ...state,
        inputValue: action.value,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: action.value,
        };
    default:
      return state;
  }
};

export const inputNameCreator = values => ({ type: 'INPUT_NAME', value: values });

export const showModalCreator = value => ({ type: 'SHOW_MODAL', value });

export default gameReducer;

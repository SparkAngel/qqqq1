
const initialState = {
  inputValue: 0,
  show: false,
  random: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_SEC':
      return {
        ...state,
        inputValue: action.value,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: action.value,
        };
    case 'RANDOM':
      return {
        ...state,
        random: action.value,
        };
    default:
      return state;
  }
};

export const inputNameCreator = values => ({ type: 'INPUT_SEC', value: values });

export const showModalCreator = value => ({ type: 'SHOW_MODAL', value });

export const randomCreator = value => ({ type: 'RANDOM', value });

export default gameReducer;

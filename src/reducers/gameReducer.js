import _sample from 'lodash/sample';
import _times from 'lodash/times';

const initialState = {
  inputValue: 0,
  show: false,
  random: null,
  arrRandom: _times(100, Number),
  redColor: [],
  greenColor: [],
  isActive: false,
  endTimes: false,
  aiWin: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_SEC':
      return {
        ...state,
        inputValue: action.value,
      };
    case 'ACTIVE_GAME':
      return {
        ...state,
        isActive: action.value,
      };
    case 'END_TIMES':
      return {
        ...state,
        endTimes: action.value,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: action.value,
        };
    case 'RANDOM':
      let number = _sample(state.arrRandom);
      return {
        ...state,
        random: number,
        arrRandom: state.arrRandom.filter(n => n != number),
        };
    case 'COLOR_GREEN':
      return {
        ...state,
        greenColor: [...state.greenColor, action.value],
        };
    case 'COLOR_RED':
      console.log(action.value);
      return {
        ...state,
        redColor: [...state.redColor, action.value],
        };
    case 'AI_WIN':
      return {
        ...state,
        aiWin: state.aiWin + action.value,
        };
    default:
      return state;
  }
};

export const inputNameCreator = values => ({ type: 'INPUT_SEC', value: values });

export const showModalCreator = value => ({ type: 'SHOW_MODAL', value });

export const setIsActiveCreator = value => ({ type: 'ACTIVE_GAME', value });

export const setEndTimesCreator = value => ({ type: 'END_TIMES', value });

export const randomCreator = () => ({ type: 'RANDOM' });

export const setRedCreator = value => ({ type: 'COLOR_RED', value});

export const setGreenCreator = value => ({ type: 'COLOR_GREEN', value});

export const setAiWinCreator = value => ({ type: 'AI_WIN', value});

export default gameReducer;

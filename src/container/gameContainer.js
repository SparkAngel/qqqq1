/*eslint-disable*/
import { connect } from 'react-redux';
import { showModalCreator, inputNameCreator, randomCreator, setRedCreator, setGreenCreator, setIsActiveCreator, setEndTimesCreator, setAiWinCreator } from '../reducers/gameReducer';
import gameApp from '../components/gameApp';

const mapStateToProps = (state) => {
  return {
    register: state.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputSec: (text) => {
      dispatch(inputNameCreator(text));
    },
    showModal: (value) => {
      dispatch(showModalCreator(value));
    },
    isActive: (value) => {
      dispatch(setIsActiveCreator(value));
    },
    endTimes: (value) => {
      dispatch(setEndTimesCreator(value));
    },
    random: () => {
      dispatch(randomCreator());
    },
    setGreenColor: (value) => {
      dispatch(setGreenCreator(value));
    },
    setRedColor: (value) => {
      dispatch(setRedCreator(value));
    },
    setAiWin: (value) => {
      dispatch(setAiWinCreator(value));
    },
  };
};

const gameContainer = connect(mapStateToProps, mapDispatchToProps)(gameApp);

export default gameContainer;

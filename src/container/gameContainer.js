/*eslint-disable*/
import { connect } from 'react-redux';
import { showModalCreator, inputNameCreator, randomCreator } from '../reducers/gameReducer';
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
    random: (value) => {
      dispatch(randomCreator(value));
    },
  };
};

const gameContainer = connect(mapStateToProps, mapDispatchToProps)(gameApp);

export default gameContainer;

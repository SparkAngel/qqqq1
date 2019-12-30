import React, { useState, useEffect } from 'react';
import _times from 'lodash/times';
//import _sample from 'lodash/sample';
// _remove from 'lodash/sample';
import classNames from 'classnames';
import Modal from '../components/modal';



let interval = null;
const WIN_POINT = 9;

const GameApp = (props) => {
  //const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState();
  //const [random, setRandom] = useState();
  const [arr] = useState(_times(100, Number)); // массив от 0-100
  //const [green, setGreen] = useState([]);
  // [red, setRed] = useState([]);
  //const [endTimes, setEndTimes] = useState(false);
  const [youWin, setYouWin] = useState(0);
  //const [aiWin, setAiWin] = useState(0);
  const [oneClick, setOneClick] = useState(false);

  const secondsRedux = props.register.inputValue;
  const disabledButton = secondsRedux > 0 ? false : true;
  //const [arrRandom, serArrRandom] = useState(_times(100, Number));  // массив от 0-100
  const randomRedux = props.register.random;
  const redReduxState = props.register.redColor;
  const greenReduxState = props.register.greenColor;
  const isActive = props.register.isActive;
  const endTimesReduxState = props.register.endTimes;
  const aiWinReduxState = props.register.aiWin;
  //const randomNumber = () => {  // для вычисления рандомного числа по которому ДИВ нужно нажать
    //let number = _sample(arrRandom); // рандомный элемент из масива что бы не повторялись числа.
   // serArrRandom(arrRandom.filter(n => n != number))
    //setRandom(number);
   // randomlDispatch(number);
 // };

  const handleStartGame = () => (
    setSeconds(secondsRedux),
    randomlDispatch(),
    setIsActiveDispatch(true)
  );

  const handleNextGame = () => (
    setSeconds(secondsRedux),
    //setEndTimes(false),
    setEndTimesDispatch(false),
    randomlDispatch(),
    setOneClick(false)
    //setIsActiveDispatch(true)
    //setIsActive(true)
  );

  const whoWin = () => {  // для определения кто выиграл и нужно ли закончить игру
    console.log(aiWinReduxState);
    if (aiWinReduxState === WIN_POINT || youWin === WIN_POINT) {
      //setSeconds(0);
      setIsActiveDispatch(false);
      showModalDispatch(true);
    }
      return;
  };

  const handleClick = (e) => {  // определение правильности выбора и  случайных нажатий
    if (isActive || endTimesReduxState) {
    if (randomRedux === +e.target.id && !endTimesReduxState && !oneClick) {
      //setGreen([...green, +e.target.id]);
      setGreenColorDispatch(+e.target.id);
    //  setOneClick(true);
      setYouWin(prev => {
        const qq = prev + 1;
        whoWin(aiWinReduxState, qq);
        handleNextGame();
        return qq;
      });
    } else {
      //setRed([...red, randomRedux]);
      setRedColorDispatch(randomRedux);
      setAiWinDispatch(1);
     // setOneClick(true);
      whoWin(aiWinReduxState, youWin);
      handleNextGame();
     // setAiWin(prev => {
        //const qq = oneClick ? prev + 0 : prev + 1;
       // whoWin(qq, youWin);
       // handleNextGame();
       // return qq;
     // });
    }
  } else {
    return;
  }
  };

  useEffect(() => {  // в хуке делаю интервал для отсчета времени

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(sec => {
          if (sec === 0) {
            setRedColorDispatch(randomRedux);
            setAiWinDispatch(1);
            setEndTimesDispatch(true);
            whoWin();
            handleNextGame();
            //setEndTimes(true);
           // setIsActiveDispatch(false);
            //setRed( prevRed => [...prevRed, randomRedux]);

            //setAiWin(prev => {
              //const qq = prev + 1;

              //handleNextGame();
              //return qq;
           // });
            return sec;
          } else {
            return sec - 1;
          }
        });
      }, 50);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const inputSeconds = e => (   // для диспатча значения из инпута в стайте редакса
    props.inputSec(e.target.value)
  );

  const showModalDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.showModal(e)
  );

  const randomlDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.random(e)
  );

  const setGreenColorDispatch= e => ( // для диспатча значения из инпута в стайте редакса
    props.setGreenColor(e)
  );

  const setRedColorDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.setRedColor(e)
  );

  const setIsActiveDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.isActive(e)
  );

  const setEndTimesDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.endTimes(e)
  );

  const setAiWinDispatch = e => ( // для диспатча значения из инпута в стайте редакса
    props.setAiWin(e)
  );

  return (
    <div className="game">
      <input
        type="number"
        className="form-control"
        placeholder="Choose your speed (ms)"
        onChange={inputSeconds}
      />
      <h1 className="h1">{seconds}</h1>

      <div className="container-score">
        <h2>Score</h2>
        <div className="score">
          <div className="text-one">You:</div>
          <div className="text-two">{youWin}</div>
          <div className="text-one">AI:</div>
          <div className="text-two">{aiWinReduxState}</div>
        </div>
      </div>

      <div className="container">
        {arr.map((el, i) => (
          <div
            key={el}
            className={classNames({
              'blue': true,
              'yellow': randomRedux === i && !oneClick,
              'green': greenReduxState.includes(i),
              'red': redReduxState.includes(i),
                })}
            id={i}
            onClick={handleClick}
          >
          </div>
        ))}
      </div>

      <div className="container-box">
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={disabledButton}
          onClick={handleStartGame}
        >
              START
        </button>
      </div>

      <Modal aiWin={aiWinReduxState} youWin={youWin}/>
    </div>
  );
};

export default GameApp;

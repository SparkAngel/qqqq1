import React, { useState, useEffect } from 'react';
import _times from 'lodash/times';
import _sample from 'lodash/sample';
import _remove from 'lodash/sample';
import classNames from 'classnames';
import Modal from '../components/modal';



let interval = null;

const GameApp = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState();
  const [random, setRandom] = useState();
  const [arr] = useState(_times(100, Number)); // массив от 0-100
  const [green, setGreen] = useState([]);
  const [red, setRed] = useState([]);
  const [endTimes, setEndTimes] = useState(false);
  const [youWin, setYouWin] = useState(0);
  const [aiWin, setAiWin] = useState(0);
  const [oneClick, setOneClick] = useState(false);
  const WIN_POINT = 9;
  const secondsRedux = props.register.inputValue;
  const disabledButton = secondsRedux > 0 ? false : true;
  const [arrRandom, serArrRandom] = useState(_times(100, Number));  // массив от 0-100
  const randomRedux = props.register.random;

  const randomNumber = () => {  // для вычисления рандомного числа по которому ДИВ нужно нажать
    let number = _sample(arrRandom); // рандомный элемент из масива что бы не повторялись числа.
    serArrRandom(arrRandom.filter(n => n != number))
    //setRandom(number);
    randomlDispatch(number);
  };

  const handleStartGame = () => (
    setSeconds(secondsRedux),
    randomNumber(),
    setIsActive(true)
  );

  const handleNextGame = () => (
    setSeconds(secondsRedux),
    setEndTimes(false),
    randomNumber(),
    setOneClick(false),
    setIsActive(true)
  );

  const whoWin = (newAiWin, newYouWin) => {  // для определения кто выиграл и нужно ли закончить игру
    if (newAiWin === WIN_POINT || newYouWin === WIN_POINT) {
      setSeconds(0);
      setIsActive(false);
      showModalDispatch(true);
    }
      return;
  };

  const handleClick = (e) => {  // определение правильности выбора и  случайных нажатий
    if (isActive || endTimes) {
    if (randomRedux === +e.target.id && !endTimes && !oneClick) {
      setGreen([...green, +e.target.id]);
      setOneClick(true);
      setYouWin(prev => {
        const qq = prev + 1;
        whoWin(aiWin, qq);
        handleNextGame();
        return qq;
      });
    } else {
      setRed([...red, randomRedux]);
      setOneClick(true);
      setAiWin(prev => {
        const qq = oneClick ? prev + 0 : prev + 1;
        whoWin(qq, youWin);
        handleNextGame();
        return qq;
      });
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
            const randomReduxq = props.register.random;
            setEndTimes(true);
           setIsActive(false);

            setRed( prevRed => [...prevRed, randomReduxq]);
            console.log(randomReduxq);
            console.log(props.register.random);
            setAiWin(prev => {
              const qq = prev + 1;


              whoWin(qq, youWin);
              handleNextGame();
              return qq;

            });
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
          <div className="text-two">{aiWin}</div>
        </div>
      </div>

      <div className="container">
        {arr.map((el, i) => (
          <div
            key={el}
            className={classNames({
              'blue': true,
              'yellow': randomRedux === i && !oneClick,
              'green': green.includes(i),
              'red': red.includes(i),
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

      <Modal aiWin={aiWin} youWin={youWin}/>
    </div>
  );
};

export default GameApp;

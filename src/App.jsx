import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timmerId, setTimmerId] = useState();

  const handeInput = (e) => {
    const val = parseInt(e.target.value);
    const id = e.target.id;

    if (id === 'hour') {
      setHour(val);
    } else if (id === 'minute') {
      setMinute(val);
    } else {
      setSecond(val);
    }
  };

  const handleStart = () => {
    if (hour < 0 || minute < 0 || second <= 0) {
      alert('Invalid input!');
      return;
    } else {
      setIsStart(true);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timmerId);
  };

  const handleResume = () => {
    setIsPaused(false);
    runTimer(second, minute, hour);
  };

  const runTimer = (second, minute, hour, timId) => {
    if (second > 0) {
      setSecond((s) => s - 1);
    } else if (second === 0 && minute > 0) {
      setMinute((m) => m - 1);
      setSecond(59);
    } else if (second === 0 && minute === 0 && hour > 0) {
      setHour((h) => h - 1);
      setMinute(59);
      setSecond(59);
    }

    if (hour === 0 && minute === 0 && second === 0) {
      setHour(0);
      setMinute(0);
      setSecond(0);
      clearInterval(timId);
      alert('Timmer finnished!');
    }
  };

  const handleReset = () => {
    setIsStart(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  useEffect(() => {
    let timId;

    timId = setInterval(() => {
      if (isStart) {
        runTimer(second, minute, hour, timId);
      }
    }, 1000);
    setTimmerId(timId);

    return () => {
      clearInterval(timId);
    };
  }, [isStart, hour, minute, second]);

  return (
    <>
      <h2>Countdown Timer </h2>

      {!isStart && (
        <div className="input-box">
          <input onChange={handeInput} id="hour" placeholder="hh" />
          <span>:</span>
          <input onChange={handeInput} id="minute" placeholder="mm" />
          <span>:</span>

          <input onChange={handeInput} id="second" placeholder="ss" />
          <button onClick={handleStart}>Start</button>
        </div>
      )}

      {isStart && (
        <div className="timmer-contdown">
          <span>{hour < 10 ? `0${hour}` : second}</span>
          <span>:</span>
          <span>{minute < 10 ? `0${minute}` : minute}</span>
          <span>:</span>
          <span>{second < 10 ? `0${second}` : second}</span>
          {isPaused ? (
            <button onClick={handleResume}>Resume</button>
          ) : (
            <button onClick={handlePause}>Paused</button>
          )}

          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </>
  );
}

export default App;

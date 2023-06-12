import { useEffect, useState } from "react";
import { TimerDisplay } from "./TimerDisplay";

export function NewTimer({ isFocused, focusTime, breakTime }) {
  const sessionMinutes = isFocused ? focusTime : breakTime;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastStartTime, setLastStartTime] = useState(0);
  const [timerIsOn, setTimerIsOn] = useState(false);

  useEffect(() => {
    setElapsedTime(0);
    setLastStartTime(0);
    setTimerIsOn(false);
  }, [isFocused]);

  useEffect(() => {
    let intervalId = null;
    const currTime = Date.now();

    if (timerIsOn) {
      intervalId = setInterval(() => {
        let time = lastStartTime + Math.floor((Date.now() - currTime) / 1000);
        setElapsedTime(time);
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timerIsOn, lastStartTime]);

  function startTimer() {
    setLastStartTime(elapsedTime);
    setTimerIsOn(true);
  }

  function pauseTimer() {
    setTimerIsOn(false);
  }

  const buttonClass =
    "rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-4 py-2 w-24 transition duration-200 ease-in-out";

  return (
    <>
      <TimerDisplay
        timerIsOn={timerIsOn}
        elapsedTime={elapsedTime}
        isFocused={isFocused}
        sessionMinutes={sessionMinutes}
      />
      {timerIsOn ? (
        <button className={buttonClass} type="button" onClick={pauseTimer}>
          Pause
        </button>
      ) : (
        <button className={buttonClass} type="button" onClick={startTimer}>
          Start
        </button>
      )}
    </>
  );
}

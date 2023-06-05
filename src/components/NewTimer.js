import { useEffect, useState } from "react";
import { TimerDisplay } from "./TimerDisplay";

export function NewTimer({ isFocused, focusTime, breakTime }) {
    const sessionMinutes = isFocused ? focusTime : breakTime;
    const [elapsedTime, setElapsedTime] = useState(0);
    const [lastStartTime, setLastStartTime] = useState(0);
    const [timerIsOn, setTimerIsOn] = useState(false);
    const [currentTimeString, setCurrentTimeString] = useState(() => {
        return getFormattedTime(0, sessionMinutes*60)
    });
    const [remainingPercentage, setRemainingPercentage] = useState(0);
  
    function getFormattedTime(passedTime, totalTime){
      const remainingTime = totalTime - passedTime;
      const minutes = Math.floor(remainingTime / 60);
      const secondsString = remainingTime % 60 < 10 ? '0' + remainingTime % 60 : remainingTime % 60;
      return `${minutes}:${secondsString}`
    }

    useEffect(() => {
      setElapsedTime(0);
      setLastStartTime(0);
      setCurrentTimeString(getFormattedTime(0, sessionMinutes * 60));
      setRemainingPercentage(0);
      setTimerIsOn(false);
    }, [isFocused]);
  
    useEffect(() => {
      let intervalId = null;
      const currTime = Date.now();
  
      if (timerIsOn) {
        intervalId = setInterval(() => {
          let time = lastStartTime + Math.floor((Date.now() - currTime) / 1000);
          setElapsedTime(time);
          setCurrentTimeString(getFormattedTime(time, sessionMinutes*60));
          setRemainingPercentage(Math.floor(time/(sessionMinutes* 60) * 100));
        }, 100);
      } else {
        clearInterval(intervalId);
      }
  
      return () => clearInterval(intervalId);
    }, [timerIsOn, lastStartTime, sessionMinutes]);
  
    function startTimer() {
      setLastStartTime(elapsedTime);
      setTimerIsOn(true);
    }
  
    function pauseTimer() {
      setTimerIsOn(false);
    }
  
    return (
      <TimerDisplay 
        timerIsOn={timerIsOn}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        currentTimeString={currentTimeString}
        elapsedTime={elapsedTime}
        remainingPercentage={remainingPercentage}
        isFocused={isFocused}
      />
    );
  }

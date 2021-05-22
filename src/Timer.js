import { useState, useEffect } from 'react';
import {Row, Col, ButtonGroup, ToggleButton} from 'react-bootstrap';
import LiquidFillGauge from 'react-liquid-gauge';

function Timer(props) {
    const [elapsedTime, setElapsedTime] = useState(0)
    const [startTime, setStartTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [pomodoro, setPomodoro] = useState(true);

    useEffect(
      () => {
        var start = Date.now();
        if (timerOn) {
          const timer = setInterval(() => {
            setElapsedTime(startTime + Math.floor((Date.now() - start)/1000))
        }, 100);
          return () => clearInterval(timer);
        }
      },
      [timerOn, startTime ]
    );

    function startTimer(){
      setTimerOn(true)
    }

    function pauseTimer(){
      setTimerOn(false)
      setStartTime(elapsedTime)
    }

    function startPomodoro(){
      setPomodoro(true)
      setTimerOn(false)
      setElapsedTime(0)
    }

    function startBreak(){
      setPomodoro(false)
      setTimerOn(false)
      setElapsedTime(0)
    }

    function getRemainingTime(){
      let time;
      if(pomodoro){
        time = props.focusTime - elapsedTime;
      }
      else{
        time = props.breakTime - elapsedTime;
      }

      return <>{Math.floor(time / 60)}:{time % 60 < 10 ? '0' + time % 60 : time % 60}</>
    }

    function remainingPercentage(){
      if(pomodoro) return Math.floor(elapsedTime/props.focusTime * 100)
      else return Math.floor(elapsedTime/props.breakTime * 100)
    }

    return (
      <>
      <Row>
        <Col style = {{paddingTop: '50px'}} xs="col-12" className="d-flex justify-content-center">
          <ButtonGroup toggle>
            <ToggleButton
              type="radio"
              variant="outline-secondary"
              name="radio"
              checked={pomodoro}
              onChange={() => startPomodoro()}
              value = "1"
              className="shadow-none"
            >
              Pomodoro
            </ToggleButton>
            <ToggleButton
              type="radio"
              variant="outline-secondary"
              name="radio"
              checked={!pomodoro}
              onChange={() => startBreak()}
              value = "2"
              className="shadow-none"
            >
              Break
            </ToggleButton>
          </ButtonGroup>
        </Col>
        <Col xs="col-12" className="d-flex justify-content-center">
          <LiquidFillGauge
            style={{ margin: '0 auto'}}
            value={!timerOn && elapsedTime == 0 ? 30: remainingPercentage()}
            width= {250}
            height={300}
            percent="%"
            textSize={1}
            textOffsetX={0}
            textOffsetY={20}
            textRenderer={() => {
              return (
                <tspan>
                  <tspan style = {{fontSize: '65px'}} className="value">{getRemainingTime()}</tspan>
                </tspan>
              );
            }}
            riseAnimation
            riseAnimationTime={1000}
            waveAnimation
            outerRadius={.95}
            waveFrequency={2}
            waveAmplitude={timerOn ? 0 : 1}
            circleStyle={{
              fill: pomodoro ? "#5AB9EA" : "#FFC834"
            }}
            waveStyle={{
              fill: pomodoro ? "#5AB9EA" : "#FFC834"
            }}
            textStyle={{
              fill: "#555555",
              fontFamily: 'Arial'
            }}
            waveTextStyle={{
              fill: '#fff',
              fontFamily: 'Arial'
            }}
          />
        </Col>
        <Col xs="col-12" className="d-flex justify-content-center">
          {timerOn ? <button style = {{width: "100px"}} className="btn btn-outline-secondary shadow-none" onClick={()=>pauseTimer()}>Pause</button>
            : <button style={{ width: "100px" }} className="btn btn-outline-secondary shadow-none" onClick={() => startTimer()}>Start</button>}
        </Col>
      </Row>
      </>
    );
}

export default Timer
import { useState, useEffect } from 'react';
import {Row, Col, ButtonGroup, ToggleButton} from 'react-bootstrap';
import LiquidFillGauge from 'react-liquid-gauge';
import ls from 'local-storage';
import TodoList from './TodoList'

function Timer(props) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [pomodoro, setPomodoro] = useState(true);
    const [currInterval, setCurrInterval] = useState(0);
    const [date, setDate] = useState(ls.get("date") || "");
    const [studyTime, setStudyTime] = useState(ls.get("studyTime") || 0);

    const [todoList, setTodoList] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(()=>{
      if(localStorage.getItem("todoList")){
        setTodoList(JSON.parse(localStorage.getItem("todoList")));
      }
      console.log(todoList)
    }, []);

    function addTask(values){
      let updateTodoList = [...(todoList || []), 
        {task: values.task, intervals: values.intervals, currInterval: 0, id: Date.now(), complete: false}];
      setTodoList(updateTodoList);
      localStorage.setItem('todoList', JSON.stringify(updateTodoList));
    }

    function removeTask(id){
      if(id === currentTask){
        setCurrentTask(null);
      }
      let updateTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updateTodoList);
      localStorage.setItem('todoList', JSON.stringify(updateTodoList));
    }

    function completeTask(id){
      let updateTodoList = [...todoList];
      let index = todoList.findIndex(todo => todo.id === id);
      updateTodoList[index].complete = !updateTodoList[index].complete;
      setTodoList(updateTodoList);
      localStorage.setItem('todoList', JSON.stringify(updateTodoList));
    }

    function updateCurrentTask(id){
      if(currentTask === id){
        setCurrentTask(null);
      }
      else{
        setCurrentTask(id);
      }
    }

    useEffect(
      () => {
        var start = Date.now();
        if (timerOn) {
          const timer = setInterval(() => {
            let time = startTime + Math.floor((Date.now() - start)/1000);
            setElapsedTime(time);

            if(pomodoro && time === props.focusTime){
              clearInterval(timer);
              props.playSound();
              setStudyTime(props.focusTime + studyTime)
              ls.set('studyTime', props.focusTime + studyTime);
              if(props.autoStartBreak){
                startBreak();
              }
              else{
                pressBreak();
              }
            } 

            if(!pomodoro && time === props.breakTime){
              clearInterval(timer);
              props.playSound();
              if(currInterval < props.intervals){
                setCurrInterval(currInterval + 1);
                startPomodoro();
              }
              else{
                pressBreak();
              }
            }
        }, 100);
          return () => clearInterval(timer);
        }

        if(date !== new Date(start).getDate()){
          setStudyTime(0);
          ls.set('studyTime', 0);
          ls.set('date', new Date(start).getDate())
          setDate(new Date(start).getDate());
        }
      },
      [timerOn, startTime, pomodoro, props.focusTime, props.autoStartBreak]
    );

    function startTimer(){
      setTimerOn(true);
    }

    function pauseTimer(){
      setTimerOn(false);
      setStartTime(elapsedTime);
    }

    function startPomodoro(){
      setPomodoro(true);
      setStartTime(0);
      setElapsedTime(0);
    }

    function startBreak(){
      setPomodoro(false);
      setStartTime(0);
      setElapsedTime(0);
    }

    function pressPomodoro(){
      setTimerOn(false);
      startPomodoro();
    }

    function pressBreak(){
      setTimerOn(false);
      startBreak();
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
      if(pomodoro) return Math.floor(elapsedTime/props.focusTime * 100);
      else return Math.floor(elapsedTime/props.breakTime * 100);
    }

    return (
      <>
      <Row style = {{paddingBottom: "50px"}}>
        <Col style = {{paddingTop: '25px'}} xs="col-12" className="d-flex justify-content-center">
          <div>Today's Focus Time: {Math.floor(studyTime/3600)}h {Math.floor((studyTime % 3600)/60)}m</div>
        </Col>
        <Col style = {{paddingTop: '25px'}} xs="col-12" className="d-flex justify-content-center">
          <ButtonGroup toggle>
            <ToggleButton
              type="radio"
              variant="outline-secondary"
              name="radio"
              checked={pomodoro}
              onChange={() => pressPomodoro()}
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
              onChange={() => pressBreak()}
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
            value={!timerOn && elapsedTime === 0 ? 30: remainingPercentage()}
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
      <div className="d-flex justify-content-center" style = {{marginBottom: '20px'}}>
        {currentTask != null ? (
          <div><b>Current Task: </b>{todoList.filter(todo => todo.id == currentTask)[0].task}</div>
        ) : <div>&nbsp;</div>}
      </div>
      <TodoList 
        addTask={addTask} 
        todoList={todoList} 
        removeTask = {removeTask}
        completeTask = {completeTask}
        currentTask = {currentTask}
        updateCurrentTask = {updateCurrentTask}
      />
      </>
    );
}

export default Timer
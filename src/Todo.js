import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'  

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [currTodo, setCurrTodo] = useState("");
  const [currInterval, setCurrInterval] = useState(1);

  useEffect(()=>{
    if(localStorage.getItem("todoList")){
      setTodoList(JSON.parse(localStorage.getItem("todoList")))
    }
  }, []); 

  function addTodo(e){
    
  }

  return (
    <div>
      {todo.task}
    <form>
      <input type = 'text' placeholder="Enter Task You Would Like To Work On"/>
    </form>
    </div>
  );
};
 
export default Todo;
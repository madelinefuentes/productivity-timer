import React, { useState, useEffect } from "react";
import {Row, Col} from 'react-bootstrap'; 
import '../src/styling/TodoList.scss'

const initialFormValues = {
  task: "",
  intervals: 1
};

function TodoList(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showForm, setShowForm] = useState(false);
  const [deletionIndex, setDeletionIndex] = useState(null);
  const [completionIndex, setCompletionIndex] = useState(null);

  function handleInputChange(e){
    const {name, value} = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  function addTask(){
    props.addTask(formValues)
    setFormValues(initialFormValues);
    setShowForm(false);
  }

  function removeTask(id){
    props.removeTask(id);
  }

  function completeTask(e, id){
    e.stopPropagation();
    props.completeTask(id);
  }

  function setCurrentTask(id){
    props.updateCurrentTask(id);
  }

  return (
    <>
      <table style = {{marginLeft: "auto", marginRight: "auto"}} className="table col-sm-10 col-md-5">
        <thead>
          <tr>
            <th><div style = {{borderBottom: '2px solid', fontSize: '18px'}}>Todo List</div></th>
          </tr>
        </thead>
        <tbody>
          {props.todoList != null ? props.todoList.map(todo =>{
            return(
              <tr
                //onMouseEnter={() => setDeletionIndex(todo.id)} 
                //onMouseLeave={() => setDeletionIndex(null)}
                onClick = {() => setCurrentTask(todo.id)}
                style = {{cursor: "pointer"}}
              >
                <td>
                  <Row className="align-items-center" 
                    style = {{borderLeft: todo.id === props.currentTask ? '5px solid #5AB9EA' : '1px solid #D3D3D3', border: '1px solid #D3D3D3', borderRadius: '5px', paddingTop: '10px', paddingBottom: '10px', margin:'0px'}}>
                    <Col>
                      <div style = {{textDecoration: todo.complete ? "line-through" : ""}}>{todo.task}</div>
                    </Col>
                    <Col className = "d-flex justify-content-center">
                      <div style = {{textDecoration: todo.complete ? "line-through" : ""}}>{todo.currInterval}/{todo.intervals}</div>
                    </Col>
                    <Col className = "d-flex justify-content-end">
                      <button 
                        style={{ color: todo.complete ? "green" : "#C8C8C8"}} 
                        onClick={(e)=>completeTask(e, todo.id)}
                        className="btn btn-small shadow-none">
                        <i className="fa fa-check-circle fa-lg"></i></button>
                      <button 
                        //onMouseEnter={() => setDeletionIndex(todo.id)} 
                        //onMouseLeave={() => setDeletionIndex(null)}
                        style={{ color: "#808080"}} 
                        onClick = {()=>removeTask(todo.id)} 
                        className="btn btn-small shadow-none">
                        <i className="fa fa-trash fa-lg"></i></button>
                    </Col>
                  </Row>
                </td>
              </tr>
            )}) : ""}
            <tr className = "d-flex justify-content-center">
              <td>{showForm ? (
                <Row className="no-gutters" style={{ padding: '10px', marginLeft: '0px', marginRight: '0px', marginBottom: '20px' }}>
                  <Col xs={{ span: 8, offset: 2 }} className="d-flex justify-content-center">
                    <input
                      type="text"
                      value={formValues.task}
                      name="task"
                      onChange={handleInputChange}
                      className="form-control shadow-none" s
                      placeholder="Enter a Task to Work On"
                      autoComplete="off"
                    />
                  </Col>
                  <Col style ={{marginTop: '10px'}} xs="12" className="d-flex justify-content-around">
                    <div className="form-group form-inline">
                      <label style={{ marginRight: '10px', color: '#555555'}}>Pomodoro: </label>
                      <input
                        value={formValues.intervals}
                        name="intervals"
                        onChange={handleInputChange}
                        className="form-control shadow-none"
                        style={{ width: '40px' }}
                        size="1"
                      />
                    </div>
                  </Col>
                  <Col xs={{ span: 3, offset: 3 }} className="d-flex justify-content-center">
                    <button type="button" style={{ width: "80px" }} className="btn btn-outline-secondary shadow-none" onClick={() => setShowForm(false)}>Cancel</button>
                  </Col>
                  <Col xs={{ span: 3, offsetRight: 3 }} className="d-flex justify-content-center">
                    <button
                      type="button"
                      style={{ width: "80px" }}
                      className="btn btn-outline-secondary shadow-none"
                      onClick={() => addTask()}
                      disabled={formValues.task == '' || formValues.intervals == '' || parseInt(formValues.intervals) < 1}>
                      Add</button>
                  </Col>
                </Row>
                ) : 
                <button 
                  style = {{width: "120px", marginBottom: "120px"}} 
                  className="btn btn-outline-secondary shadow-none" 
                  onClick={()=>setShowForm(true)}>
                    Add a Task
                </button>}</td>
            </tr>
        </tbody>
      </table>
    </>
  );
};
 
export default TodoList;
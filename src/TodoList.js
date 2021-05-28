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
              <tr>
                <td>
                  <Row style = {{border: '1px solid #aaa9a8', borderRadius: '5px', paddingTop: '10px', paddingBottom: '10px', margin:'0px'}}>
                    <Col>
                      {todo.task}
                    </Col>
                    <Col>
                      {todo.currInterval}/{todo.intervals}
                    </Col>
                  </Row>
                </td>
              </tr>
            )}) : ""}
            <tr className = 'd-flex justify-content-center'>
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
                  <Col xs="12" className="d-flex justify-content-around">
                    <label style={{ color: "#555555" }}>Pomodoro: </label>
                    <input
                      value={formValues.intervals}
                      name="intervals"
                      onChange={handleInputChange}
                      className="form-control shadow-none"
                      style={{ width: "40px" }}
                      size="1"
                    />
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
                      disabled={formValues.task == '' || formValues.intervals == ''}>
                      Add</button>
                  </Col>
                </Row>
                ) : 
                <button 
                  style = {{width: "120px"}} 
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
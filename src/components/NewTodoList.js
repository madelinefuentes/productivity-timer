import { useState, useEffect } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoListItem } from './TodoListItem';
import { v4 as uuidv4 } from 'uuid';

export function NewTodoList() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('todoList');
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function addTask(taskName, pomodoroTarget) {
    const id = uuidv4();
    setTodoList(todoList => [
      ...todoList,
      { id, taskName, pomodoros: 0, pomodoroTarget, complete: false },
    ]);
  }

  function removeTask(taskId) {
    setTodoList(todoList => todoList.filter(item => item.id !== taskId));
  }

  return (
    <div className="w-[375px] pt-10 flex flex-col">
      <div
        className="text-lg font-bold border-b-2 border-b-slate-700"
        style={{}}
      >
        <h1>Todo List</h1>
      </div>
      {todoList.map(todoListItem => <TodoListItem todoItem={todoListItem} removeTask={removeTask}/>)}
      {showAddTodoForm ? (
        <AddTodoForm setShowAddTodoForm={setShowAddTodoForm} addTask={addTask}/>
      ) : (
        <button
          className="rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-3 py-2 w-28 transition duration-200 ease-in-out self-center mt-4 mb-28"
          onClick={() => setShowAddTodoForm(true)}
        >
          Add a Task
        </button>
      )}
    </div>
  );
}

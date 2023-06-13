import { useState, useEffect } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoListItem } from "./TodoListItem";

export function NewTodoList() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem("todoList");
    return savedTodoList ? JSON.parse(savedTodoList) : [];
  });
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  function removeTask(taskId) {
    setTodoList((todoList) => todoList.filter((item) => item.id !== taskId));
    if (taskId === currentTask) {
      setCurrentTask(null);
    }
  }

  return (
    <div className="w-[400px] flex flex-col">
      {currentTask ? 
  <h2 className="text-center py-6">
    <span className="font-bold">Current Task: </span>
    {todoList.find((item) => item.id === currentTask).taskName}
  </h2>
: <div className="h-14"></div>}

      <div
        className="text-lg font-bold border-b-2 border-b-slate-700"
        style={{}}
      >
        <h1>Todo List</h1>
      </div>
      {todoList.map((todoListItem) => (
        <TodoListItem
          todoItem={todoListItem}
          removeTask={removeTask}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      ))}
      {showAddTodoForm ? (
        <AddTodoForm
          setShowAddTodoForm={setShowAddTodoForm}
          setTodoList={setTodoList}
        />
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

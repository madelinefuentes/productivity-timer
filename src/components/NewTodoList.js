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
  }

  return (
    <div className="w-[375px] pt-10 flex flex-col">
      {currentTask && <p>{`Current Task: ${todoList.find(item => item.id === currentTask).taskName}`}</p>}
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

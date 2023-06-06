import { useState, useEffect } from "react";
import { AddTodoForm } from "./AddTodoForm";

export function NewTodoList() {
  const [todoList, setTodoList] = useState([]);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("todoList")) {
      setTodoList(JSON.parse(localStorage.getItem("todoList")));
    }
  }, []);

  return (
    <div className="w-[475px] pt-10 flex flex-col">
      <div
        className="text-lg font-bold border-b-2 border-b-slate-700"
        style={{}}
      >
        Todo List
      </div>
      {todoList.map((todoListItem, i) => {
        return <div>{todoListItem}</div>;
      })}
      {showAddTodoForm ? (
        <AddTodoForm setShowAddTodoForm={setShowAddTodoForm}/>
      ) : (
        <button
          className="rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-3 py-2 w-28 transition duration-200 ease-in-out self-center mt-4"
          onClick={() => setShowAddTodoForm(true)}
        >
          Add a Task
        </button>
      )}
    </div>
  );
}

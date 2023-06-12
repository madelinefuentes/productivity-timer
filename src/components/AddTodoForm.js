import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';

export function AddTodoForm({ setShowAddTodoForm, setTodoList }) {
  const [taskName, setTaskName] = useState(null);
  const [pomodoroTarget, setPomodoroTarget] = useState(1);
  const isDisabled =
    taskName == null || taskName.length < 1 || pomodoroTarget < 1;

  function handlePomodoroChange(event) {
    const value = event.target.value;
    if (value >= 1 && value < 100) {
      setPomodoroTarget(value);
    }
  }

  const addTask= useCallback(() => {
    const id = uuidv4();
    setTodoList(todoList => [
      ...todoList,
      { id, taskName, pomodoros: 0, pomodoroTarget, complete: false },
    ]);
    setTaskName("");
    setPomodoroTarget(1);
  }, [pomodoroTarget, taskName, setTodoList]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isDisabled && event.key === "Enter") {
        addTask();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [addTask, isDisabled]);

  return (
    <div className="flex flex-col mt-4 items-center">
      <input
        className="w-9/12 h-9 rounded-md ring-1 ring-inset ring-slate-300 pl-3"
        type="text"
        placeholder="Enter a Task to Work On"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <label className="mt-3 flex gap-3">
        <p>Pomodoro:</p>
        <input
          className="w-10 h-7 rounded-md ring-1 ring-inset ring-slate-300 text-center"
          type="number"
          value={pomodoroTarget}
          onChange={(e) => handlePomodoroChange(e)}
        />
      </label>
      <div className="mt-2 mb-5 flex gap-4">
        <button
          className="rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-3 py-2 w-20 transition duration-200 ease-in-out"
          onClick={() => setShowAddTodoForm(false)}
        >
          Close
        </button>
        <button
          className={`rounded-md ring-1 ring-inset px-3 py-2 w-20 transition duration-200 ease-in-out${
            isDisabled
              ? "text-gray-300 ring-gray-300"
              : "text-gray-500 ring-gray-500 hover:bg-gray-600 hover:text-slate-100"
          }`}
          onClick={addTask}
          disabled={isDisabled}
        >
          Add
        </button>
      </div>
    </div>
  );
}
